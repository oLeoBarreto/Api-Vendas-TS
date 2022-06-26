import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('user not found!');
    }

    await userRepository.remove(user);
  }
}
