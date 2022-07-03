import { inject, injectable } from 'tsyringe';
import { IUser } from '../infra/domain/models/IUser';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
