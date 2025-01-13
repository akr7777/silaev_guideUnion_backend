import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async findOne(id: string): Promise<News> {
    const existingNews = await this.newsRepository.findOne({ where: { id } });
    if (!existingNews) {
      throw new NotFoundException('Новость не найдена');
    }
    return existingNews;
  }

  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  async uploadNPreview(
    id: string,
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    if (news.nPreviewPhoto) {
      await this.s3Service.deleteFile(news.nPreviewPhoto);
    }

    const previewUrl = await this.s3Service.uploadFile(file, folder);
    news.nPreviewPhoto = previewUrl;
    await this.newsRepository.save(news);

    return previewUrl;
  }

  async updateNews(id: string, updateDto: UpdateNewsDto): Promise<News> {
    const existingNews = await this.newsRepository.findOne({ where: { id } });
    if (!existingNews) {
      throw new NotFoundException('Новость не найдена');
    }

    const updatedNews = { ...existingNews, ...updateDto };

    return await this.newsRepository.save(updatedNews);
  }

  async deleteNews(id: string): Promise<void> {
    const existingNews = await this.newsRepository.findOne({ where: { id } });
    if (!existingNews) {
      throw new NotFoundException('Новость не найдена');
    }

    await this.newsRepository.delete(id);
  }
}
