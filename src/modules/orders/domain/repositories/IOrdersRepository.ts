import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRespository {
  findById(id: string): Promise<IOrder | null>;
  createOrder(data: ICreateOrder): Promise<IOrder>;
}
