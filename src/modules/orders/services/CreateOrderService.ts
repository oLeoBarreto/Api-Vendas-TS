import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRespository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrdersRespository } from '../domain/repositories/IOrdersRepository';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const amountAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].amount <
        product.amount,
    );

    if (amountAvailable.length) {
      throw new AppError(
        `The amount ${amountAvailable[0].amount}
         is not available for ${amountAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      amount: product.amount,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductAmount = order_products.map(product => ({
      id: product.product_id,
      amount:
        existsProducts.filter(p => p.id === product.product_id)[0].amount -
        product.amount,
    }));

    await this.productsRepository.updateStock(updatedProductAmount);

    return order;
  }
}
