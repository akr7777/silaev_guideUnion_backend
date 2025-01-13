import { EventService } from './events.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';
import { Event } from '../entities/event.entity';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), S3Module],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
