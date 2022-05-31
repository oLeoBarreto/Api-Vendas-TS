import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already registered!');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}
