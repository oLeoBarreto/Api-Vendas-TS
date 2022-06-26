import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRespository';
import { getRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';

export default class CustomersRepository implements ICustomersRepository {
  private ormReporsitory: Repository<Customers>;

  constructor() {
    this.ormReporsitory = getRepository(Customers);
  }

  public async findAll(): Promise<Customers[] | undefined> {
    const customers = await this.ormReporsitory.find();

    return customers;
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = await this.ormReporsitory.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = await this.ormReporsitory.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = await this.ormReporsitory.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormReporsitory.create({ name, email });

    await this.ormReporsitory.save(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    await this.ormReporsitory.save(customer);

    return customer;
  }

  public async remove(customer: Customers): Promise<void> {
    await this.ormReporsitory.remove(customer);
  }
}
