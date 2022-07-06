import { IHashProvider } from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  async generateHash(key: string): Promise<string> {
    return key;
  }

  async compareHash(key: string, hashed: string): Promise<boolean> {
    return key === hashed;
  }
}
