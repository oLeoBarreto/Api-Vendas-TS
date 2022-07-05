import { inject, injectable } from 'tsyringe';
import { IPaginateUser } from '../infra/domain/models/IPaginateUser';
import { IUsersRepository } from '../infra/domain/repositories/IUsersRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ limit, page }: SearchParams): Promise<IPaginateUser> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const users = await this.usersRepository.findAll({ page, skip, take });

    return users;
  }
}
