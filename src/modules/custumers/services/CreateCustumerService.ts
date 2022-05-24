import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custumers from '../typeorm/entities/Custumers';
import CustumersRepository from '../typeorm/repositories/CustumersRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustumerService {
  public async execute({ name, email }: IRequest): Promise<Custumers> {
    const custumersRepository = getCustomRepository(CustumersRepository);
    const emailExists = await custumersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already registered!');
    }

    const custumer = custumersRepository.create({
      name,
      email,
    });

    await custumersRepository.save(custumer);

    return custumer;
  }
}
