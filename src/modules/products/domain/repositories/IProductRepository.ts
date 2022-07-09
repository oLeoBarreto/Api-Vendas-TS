import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IPaginateProduct } from '../models/IPaginateProduct';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateProduct>;
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
