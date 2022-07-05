import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('Should be able to create a customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Leonardo Barreto',
      email: 'leobcontato@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create a customer with the same email', async () => {
    await createCustomer.execute({
      name: 'Leonardo Barreto',
      email: 'leobcontato@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Leonardo Barreto',
        email: 'leobcontato@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
