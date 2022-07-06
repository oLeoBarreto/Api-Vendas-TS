import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let CreateUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    CreateUser = new CreateUserService(fakeUserRepository, hashProvider);
  });
  it('Should be able to create a user', async () => {
    const user = await CreateUser.execute({
      name: 'Leonardo Barreto',
      email: 'emailLeo@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a user with the same email', async () => {
    await CreateUser.execute({
      name: 'Leonardo Barreto',
      email: 'emailLeo@gmail.com',
      password: '123123',
    });

    expect(
      CreateUser.execute({
        name: 'Leonardo Barreto',
        email: 'emailLeo@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
