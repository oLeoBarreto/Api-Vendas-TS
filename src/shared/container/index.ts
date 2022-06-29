import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRespository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
