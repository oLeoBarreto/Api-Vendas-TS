import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';
import { ICreateUserSession } from '../infra/domain/models/ICreateUserSession';
import { IUserIsAuthenticated } from '../infra/domain/models/IUserIsAuthenticated';

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateUserSession): Promise<IUserIsAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const token = sign({}, authConfig.jwt.secrect as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
