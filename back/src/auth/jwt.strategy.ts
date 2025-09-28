import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("❌ JWT_SECRET no definido");

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req?.cookies?.token;
          console.log("📦 Token recibido:", token);
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number }) {
    console.log("🔐 Payload JWT:", payload);
    const user = await this.userService.obtener(payload.sub);
    if (!user) throw new UnauthorizedException("Usuario no encontrado");

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      especialidad: user.especialidad,
      activo: user.activo,
    };
  }
}