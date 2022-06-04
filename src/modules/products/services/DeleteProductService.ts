import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found!');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.remove(product);
  }
}
