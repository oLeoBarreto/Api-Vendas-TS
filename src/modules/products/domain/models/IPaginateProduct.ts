import { IProduct } from './IProduct';

export interface IPaginateProduct {
  per_page: number;
  total: number;
  current_page: number;
  data: IProduct[];
}
