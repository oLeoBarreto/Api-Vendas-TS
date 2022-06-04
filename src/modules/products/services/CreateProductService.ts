import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  amount: number;
}

export default class CreateProductService {
  public async execute({ name, price, amount }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('Already exists one product with this name!');
    }

    const product = productRepository.create({
      name,
      price,
      amount,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.save(product);

    return product;
  }
}
