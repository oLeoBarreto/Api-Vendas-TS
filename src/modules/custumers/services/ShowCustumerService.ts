import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custumers from '../typeorm/entities/Custumers';
import CustumersRepository from '../typeorm/repositories/CustumersRepository';

interface IRequest {
  id: string;
}

export default class ShowCustumerService {
  public async execute({ id }: IRequest): Promise<Custumers> {
    const custumerRepository = getCustomRepository(CustumersRepository);

    const custumer = await custumerRepository.findById(id);

    if (!custumer) {
      throw new AppError('Custumer not found!');
    }

    return custumer;
  }
}
