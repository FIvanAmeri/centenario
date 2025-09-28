import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string; rol: string }> {
    console.log('🔍 Buscando usuario por email:', email);
    const usuario = await this.userRepo.findOne({ where: { email } });

    if (!usuario) {
      console.warn('⛔ Usuario no encontrado');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!usuario.activo) {
      console.warn('⛔ Usuario inactivo');
      throw new UnauthorizedException('Usuario inactivo');
    }

    if (!usuario.password) {
      console.error('❌ Password no definido en base');
      throw new UnauthorizedException('Contraseña no disponible');
    }

    console.log('🔐 Comparando contraseña...');
    const coincide = await bcrypt.compare(password, usuario.password);
    console.log('✅ ¿Contraseña coincide?', coincide);

    if (!coincide) {
      console.warn('⛔ Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      especialidad: usuario.especialidad ?? null,
    };

    console.log('🧾 Generando token con payload:', payload);
    const access_token = this.jwtService.sign(payload);
    console.log('🎫 Token generado correctamente');

    return {
      access_token,
      rol: usuario.rol,
    };
  }
}