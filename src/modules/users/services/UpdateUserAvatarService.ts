import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

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

    await usersRepository.save(user);

    return user;
  }
}
