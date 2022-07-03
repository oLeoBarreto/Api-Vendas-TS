import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRespository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

@EntityRepository(Order)
export default class OrdersRepository implements IOrdersRespository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
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
