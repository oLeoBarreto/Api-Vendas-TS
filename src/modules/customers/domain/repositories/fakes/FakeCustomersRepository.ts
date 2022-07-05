import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRespository';
import { v4 as uuidv4 } from 'uuid';
import Customers from '@modules/customers/infra/typeorm/entities/Customer';
import { IPaginateCustomer } from '../../models/IPaginateCustomer';

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customers[] = [];

  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.name === name);

    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.id === id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.email === email);

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = new Customers();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    const findIndex = this.customers.findIndex(
      dinfCustomer => dinfCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customers): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateCustomer> {
    const result = {
      per_page: 1,
      total: 1,
      current_page: 1,
      data: this.customers,
    };

    return result;
  }
}
