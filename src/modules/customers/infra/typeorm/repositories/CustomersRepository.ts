import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRespository';
import { getRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateCustomer> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customers): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
