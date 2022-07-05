import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { IPaginateCustomer } from '../models/IPaginateCustomer';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateCustomer>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
