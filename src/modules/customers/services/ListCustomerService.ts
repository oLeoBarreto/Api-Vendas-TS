import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomerRespository';
import Customers from '../infra/typeorm/entities/Customer';

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute(): Promise<Customers[] | undefined> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}
