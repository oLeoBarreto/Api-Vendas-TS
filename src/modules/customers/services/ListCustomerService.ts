import { inject, injectable } from 'tsyringe';
import { IPaginateCustomer } from '../domain/models/IPaginateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomerRespository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({
    limit,
    page,
  }: SearchParams): Promise<IPaginateCustomer> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}
