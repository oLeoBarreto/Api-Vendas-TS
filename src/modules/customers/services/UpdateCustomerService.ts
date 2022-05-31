import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Custmer not found!');
    }

    const cusutmerExists = await customersRepository.findByEmail(email);
    if (cusutmerExists && email != customer.email) {
      throw new AppError('Already exists one customer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
