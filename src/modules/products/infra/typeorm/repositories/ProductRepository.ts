import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProducts;
  }

  public async create({
    name,
    amount,
    price,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      amount,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }
}
