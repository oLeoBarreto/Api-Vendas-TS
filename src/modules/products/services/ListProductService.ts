import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    let products = await redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.findAll();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}
