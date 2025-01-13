import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
