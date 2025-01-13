import { NewsService } from './news.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../entities/news.entity';
import { NewsController } from './news.controller';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), S3Module],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
