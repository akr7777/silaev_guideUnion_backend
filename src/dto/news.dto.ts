import { IsString, IsOptional, IsISO8601 } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNewsDto {
  @IsISO8601()
  date: string;

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

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
