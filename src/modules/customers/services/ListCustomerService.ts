import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomerService {
  public async execute(): Promise<Customers[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = customersRepository.find();

    return customers;
  }
}
