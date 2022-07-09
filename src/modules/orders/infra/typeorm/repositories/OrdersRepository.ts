import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRespository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRespository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
