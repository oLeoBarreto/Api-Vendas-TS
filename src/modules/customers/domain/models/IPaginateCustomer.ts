import { ICustomer } from './ICustomer';

export interface IPaginateCustomer {
  per_page: number;
  total: number;
  current_page: number;
  data: ICustomer[];
}
