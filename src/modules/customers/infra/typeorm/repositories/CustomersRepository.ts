import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRespository';
import { getRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async findAll(): Promise<Customers[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
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
