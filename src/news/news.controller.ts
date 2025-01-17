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
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/jwt-guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Put(':id')
  updateNews(@Param('id') id: string, @Body() updateDto: UpdateNewsDto) {
    return this.newsService.updateNews(id, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(id);
  }
}
