import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustumersRepository from '../typeorm/repositories/CustumersRepository';

export default class DeleteCustumerService {
  public async execute(id: string): Promise<void> {
    const custumersRepository = getCustomRepository(CustumersRepository);
    const custumer = custumersRepository.findById(id);

    if (!custumer) {
      throw new AppError('Custumer not found!');
    }

    await custumersRepository.remove(custumer);
  }
}
