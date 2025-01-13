import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async LoginUser(
    @Body('login') login: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    await this.authService.validateLoginUser(login, password);
    const accessToken = await this.authService.createAccessToken(login);
    return { accessToken };
  }
}
