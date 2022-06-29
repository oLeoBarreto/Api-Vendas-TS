import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}
