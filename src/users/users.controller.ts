import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/:id/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatarUrl = await this.userService.uploadAvatar(
      id,
      file,
      'user-avatars',
    );
    return { message: 'Аватар загружен успешно', avatar: avatarUrl };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
