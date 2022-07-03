import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteUser } from '../infra/domain/models/IDeleteUser';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('user not found!');
    }

    await this.usersRepository.remove(user);
  }
}
