import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from '../CreateSessionsService';

let fakeUserRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(fakeUserRepository, hashProvider);
  });
  it('Should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo Barreto',
      email: 'emailLeo@gmail.com',
      password: '123123',
    });

    const session = await createSession.execute({
      email: 'emailLeo@gmail.com',
      password: '123123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'EmailTeste@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Leonardo Barreto',
      email: 'emailLeo@gmail.com',
      password: '123123',
    });

    expect(
      createSession.execute({
        email: 'emailLeo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
