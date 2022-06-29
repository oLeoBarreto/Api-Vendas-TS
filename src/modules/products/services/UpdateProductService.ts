import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    amount,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await this.productRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('Already exists one product with this name!');
    }

    product.name = name;
    product.price = price;
    product.amount = amount;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productRepository.save(product);

    return product;
  }
}
