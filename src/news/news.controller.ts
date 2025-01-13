import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post()
  createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
  }

  @Post('/:id/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadNPreview(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const previewUrl = await this.newsService.uploadNPreview(
      id,
      file,
      'news-previews',
    );
    return { message: 'Превью загружено успешно', preview: previewUrl };
  }

  @Put(':id')
  updateNews(@Param('id') id: string, @Body() updateDto: UpdateNewsDto) {
    return this.newsService.updateNews(id, updateDto);
  }

  @Delete(':id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(id);
  }
}
