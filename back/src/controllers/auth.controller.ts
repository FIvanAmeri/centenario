import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import type { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface UsuarioPayload {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  especialidad: string | null;
  activo: boolean;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, rol } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    console.log('✅ Cookie seteada para:', body.email);
    return { rol };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    const user = req.user as UsuarioPayload;

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      especialidad: user.especialidad,
      activo: user.activo,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    console.log("🚪 Cookie de sesión eliminada");
    return { mensaje: "Sesión cerrada" };
  }
}