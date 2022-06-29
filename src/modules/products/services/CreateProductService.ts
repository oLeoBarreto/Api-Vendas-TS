import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    amount,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('Already exists one product with this name!');
    }

    const product = this.productRepository.create({
      name,
      price,
      amount,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}
