import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }
    return existingUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async uploadAvatar(
    id: string,
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.avatar) {
      await this.s3Service.deleteFile(user.avatar);
    }

    const avatarUrl = await this.s3Service.uploadFile(file, folder);
    user.avatar = avatarUrl;
    await this.userRepository.save(user);

    return avatarUrl;
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    const updatedUser = { ...existingUser, ...updateDto };

    return await this.userRepository.save(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.userRepository.delete(id);
  }
}
