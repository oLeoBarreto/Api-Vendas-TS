import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { IResetPassword } from '../domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUserTokensRepository } from '../domain/repositories/IUserTokenReposotiry';

@injectable()
export default class ResetPasswordlService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private tokenRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
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

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
