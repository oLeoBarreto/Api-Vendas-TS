import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1652581697331 } from './migrations/1652581697331-CreateProducts';
import { CreateUsers1652902838103 } from './migrations/1652902838103-CreateUsers';
import { CreateUserTokens1653071347318 } from './migrations/1653071347318-CreateUserTokens';
import { CreateOrders1653603627714 } from './migrations/1653603627714-CreateOrders';
import { AddCustomerIdToOrders1653959925408 } from './migrations/1653959925408-AddCustomerIdToOrders';
import { CreateOrdersProducts1653604882621 } from './migrations/1653604882621-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1653605065548 } from './migrations/1653605065548-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1653605281164 } from './migrations/1653605281164-AddProductIdToOrdersProducts';
import { CreateCutomers1653958608364 } from './migrations/1653958608364-CreateCutomers';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1652581697331,
    CreateUsers1652902838103,
    CreateUserTokens1653071347318,
    CreateCutomers1653958608364,
    CreateOrders1653603627714,
    AddCustomerIdToOrders1653959925408,
    CreateOrdersProducts1653604882621,
    AddOrderIdToOrdersProducts1653605065548,
    AddProductIdToOrdersProducts1653605281164,
  ],
});
