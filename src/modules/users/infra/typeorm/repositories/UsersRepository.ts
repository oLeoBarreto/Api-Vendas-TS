import { SearchParams } from '@modules/customers/domain/repositories/ICustomerRespository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IPaginateUser } from '../../../domain/models/IPaginateUser';
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const [users, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }

  public async remove(data: User): Promise<void> {
    await this.ormRepository.remove(data);
  }
}
