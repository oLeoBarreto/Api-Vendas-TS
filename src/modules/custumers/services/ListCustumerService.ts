import { getCustomRepository } from 'typeorm';
import Custumers from '../typeorm/entities/Custumers';
import CustumersRepository from '../typeorm/repositories/CustumersRepository';

export default class ListCustumerService {
  public async execute(): Promise<Custumers[]> {
    const custumersRepository = getCustomRepository(CustumersRepository);
    const custumers = custumersRepository.find();

    return custumers;
  }
}
