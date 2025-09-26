import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    console.log('Buscando usuario por email:', email);
    const usuario = await this.userRepo.findOne({ where: { email } });
    console.log('Usuario encontrado:', usuario);

    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    console.log('Comparando contraseña...');
    const coincide = await bcrypt.compare(password, usuario.password);
    console.log('¿Coincide?', coincide);

    if (!coincide) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    console.log('Generando token con payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}