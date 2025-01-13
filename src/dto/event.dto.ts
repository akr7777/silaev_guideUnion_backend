import { IsString, IsISO8601, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventDto {
  @IsISO8601()
  datetime: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
