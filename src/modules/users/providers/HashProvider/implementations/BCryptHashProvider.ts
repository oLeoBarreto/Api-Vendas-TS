import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  async generateHash(key: string): Promise<string> {
    return await hash(key, 8);
  }

  async compareHash(key: string, hashed: string): Promise<boolean> {
    return await compare(key, hashed);
  }
}
