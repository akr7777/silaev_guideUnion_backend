import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { UserController } from './users.controller';
import { User } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), S3Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
