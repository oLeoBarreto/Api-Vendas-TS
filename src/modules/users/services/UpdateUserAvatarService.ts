import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    if (uploadConfig.driver === 's3') {
      const S3storageProvider = new S3StorageProvider();

      if (user.avatar) {
        await S3storageProvider.deleteFile(user.avatar);
      }

      const filename = await S3storageProvider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskStorageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskStorageProvider.deleteFile(user.avatar);
      }

      const filename = await diskStorageProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
