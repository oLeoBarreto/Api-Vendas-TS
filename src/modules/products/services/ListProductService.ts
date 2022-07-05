import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';
import { IPaginateProduct } from '../domain/models/IPaginateProduct';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    limit,
    page,
  }: SearchParams): Promise<IPaginateProduct> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const products = await this.productRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}
