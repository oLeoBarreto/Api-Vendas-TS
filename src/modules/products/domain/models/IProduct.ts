import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IProduct {
  id: string;
  name: string;
  order_products: IOrderProducts[];
  price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
