import { EventService } from './events.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/:id/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEPreview(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const previewUrl = await this.eventService.uploadEPreview(
      id,
      file,
      'events-previews',
    );
    return { message: 'Превью загружено успешно', preview: previewUrl };
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() updateDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateDto);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
