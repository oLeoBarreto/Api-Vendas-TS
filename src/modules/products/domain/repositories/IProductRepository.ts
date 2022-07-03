import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export interface IProductRepository {
  findAll(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
