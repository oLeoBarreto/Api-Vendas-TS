import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { IUserTokensRepository } from '../../../domain/repositories/IUserTokenReposotiry';
import UserToken from '../entities/UserToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({ token });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
