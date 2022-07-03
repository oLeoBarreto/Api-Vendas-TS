import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRespository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IUsersRepository } from '@modules/users/infra/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/infra/domain/repositories/IUserTokenReposotiry';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IOrdersRespository } from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IOrdersRespository>(
  'OrdersRepository',
  OrdersRepository,
);
