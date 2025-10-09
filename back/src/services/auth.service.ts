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


  async validateUser(email: string, password: string): Promise<User | null> {
    console.log('🔍 Buscando usuario por email:', email);
    const usuario = await this.userRepo.findOne({ where: { email } });

    if (!usuario || !usuario.activo) {
      console.warn('⛔ Usuario no encontrado o inactivo');
      return null;
    }

    if (!usuario.password) {
      console.error('❌ Password no definido en base');
      return null;
    }

    console.log('🔐 Comparando contraseña...');
    const coincide = await bcrypt.compare(password, usuario.password);
    
    if (!coincide) {
      console.warn('⛔ Contraseña incorrecta');
      return null;
    }
    
  
    const { password: _, ...result } = usuario;
    return result as User;
  }


  async login(usuario: User): Promise<{ access_token: string; rol: string }> {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      especialidad: usuario.especialidad ?? null,
    };

    console.log('🧾 Generando token con payload:', payload);
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      rol: usuario.rol,
    };
  }
}