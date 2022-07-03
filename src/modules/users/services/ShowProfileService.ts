import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowProfile } from '../infra/domain/models/IShowProfile';
import { IUser } from '../infra/domain/models/IUser';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}
