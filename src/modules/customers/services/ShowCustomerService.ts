import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }
}
