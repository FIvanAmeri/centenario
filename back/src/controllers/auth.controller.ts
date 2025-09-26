import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const token = await this.authService.login(body.email, body.password);
      return token;
    } catch (error) {
      console.error('Error en login:', error);
      throw error instanceof UnauthorizedException
        ? error
        : new UnauthorizedException('Error interno en el login');
    }
  }
}