import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomerRespository';
import Customers from '../infra/typeorm/entities/Customer';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customers> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Custmer not found!');
    }

    const cusutmerExists = await this.customersRepository.findByEmail(email);
    if (cusutmerExists && email != customer.email) {
      throw new AppError('Already exists one customer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
