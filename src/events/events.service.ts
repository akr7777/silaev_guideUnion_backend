import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { Event } from '../entities/event.entity';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const existingEvent = await this.eventRepository.findOne({ where: { id } });
    if (!existingEvent) {
      throw new NotFoundException('Мероприятие не найдено');
    }
    return existingEvent;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async uploadEPreview(
    id: string,
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено');
    }

    if (event.ePreviewPhoto) {
      await this.s3Service.deleteFile(event.ePreviewPhoto);
    }

    const previewUrl = await this.s3Service.uploadFile(file, folder);
    event.ePreviewPhoto = previewUrl;
    await this.eventRepository.save(event);

    return previewUrl;
  }

  async updateEvent(id: string, updateDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.eventRepository.findOne({ where: { id } });
    if (!existingEvent) {
      throw new NotFoundException('Мероприятие не найдено');
    }

    const updatedEvent = { ...existingEvent, ...updateDto };

    return await this.eventRepository.save(updatedEvent);
  }

  async deleteEvent(id: string): Promise<void> {
    const existingEvent = await this.eventRepository.findOne({ where: { id } });
    if (!existingEvent) {
      throw new NotFoundException('Мероприятие не найдено');
    }

    await this.eventRepository.delete(id);
  }
}
