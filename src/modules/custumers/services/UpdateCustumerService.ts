import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custumers from '../typeorm/entities/Custumers';
import CustumersRepository from '../typeorm/repositories/CustumersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustumerService {
  public async execute({ id, name, email }: IRequest): Promise<Custumers> {
    const custumersRepository = getCustomRepository(CustumersRepository);

    const custumer = await custumersRepository.findById(id);
    if (!custumer) {
      throw new AppError('Custumer not found!');
    }

    const cusutmerExists = await custumersRepository.findByEmail(email);
    if (cusutmerExists && email != custumer.email) {
      throw new AppError('Already exists one custumer with this email!');
    }

    custumer.name = name;
    custumer.email = email;

    await custumersRepository.save(custumer);

    return custumer;
  }
}
