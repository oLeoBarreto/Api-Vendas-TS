import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    amount,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await productRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('Already exists one product with this name!');
    }

    product.name = name;
    product.price = price;
    product.amount = amount;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.save(product);

    return product;
  }
}
