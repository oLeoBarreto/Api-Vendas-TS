import { EntityRepository, Repository } from 'typeorm';
import Custumers from '../entities/Custumers';

@EntityRepository(Custumers)
export default class CustumersRepository extends Repository<Custumers> {
  public async findByName(name: string): Promise<Custumers | undefined> {
    const custumer = await this.findOne({
      where: {
        name,
      },
    });

    return custumer;
  }

  public async findById(id: string): Promise<Custumers | undefined> {
    const custumer = await this.findOne({
      where: {
        id,
      },
    });

    return custumer;
  }

  public async findByEmail(email: string): Promise<Custumers | undefined> {
    const custumer = await this.findOne({
      where: {
        email,
      },
    });

    return custumer;
  }
}
