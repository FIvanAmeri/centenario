import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ← usa Authorization: Bearer
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'supersecreto',
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: number; email: string; rol: string }> {
    return {
      id: payload.sub,
      email: payload.email,
      rol: payload.rol,
    };
  }
}