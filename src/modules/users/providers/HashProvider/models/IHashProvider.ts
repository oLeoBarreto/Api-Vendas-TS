export interface IHashProvider {
  generateHash(key: string): Promise<string>;
  compareHash(key: string, hashed: string): Promise<boolean>;
}
