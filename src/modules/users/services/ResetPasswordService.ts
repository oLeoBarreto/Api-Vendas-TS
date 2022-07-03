import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IResetPassword } from '../infra/domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';
import { IUserTokenRepository } from '../infra/domain/repositories/IUserTokenReposotiry';

@injectable()
export default class ResetPasswordlService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    private tokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User Token does not exists!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists!');
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired!');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}
