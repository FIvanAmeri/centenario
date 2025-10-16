import { 
    Controller, 
    Post, 
    UploadedFile, 
    UseInterceptors, 
    Body, 
    BadRequestException, 
    UsePipes, 
    UseGuards,
    Request,
    Get,
    Res 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Express, Response } from 'express'; 

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { GuardiaLocal } from '../auth/guardia-local';
import { GuardiaJwt } from '../auth/guardia-jwt'; 
import { CreateUserDto, HorarioDto } from '../dtos/create-user.dto';
import { Rol } from '../entities/rol.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService, 
    ) {}


    @UseGuards(GuardiaLocal) 
    @Post('login') 
    async login(@Request() req, @Res({ passthrough: true }) res: Response) { 
        const jwtData = await this.authService.login(req.user);
        
        res.cookie('jwt', jwtData.access_token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 604800000,
        });
        
        return {
            statusCode: 200,
            message: 'Inicio de sesión exitoso.',
            rol: jwtData.rol, 
        };
    }


    @UseGuards(GuardiaJwt, RolesGuard) 
    @Roles(Rol.SUPERADMIN, Rol.MEDICO, Rol.ADMINISTRATIVO) 
    @Get('me') 
    getPerfil(@Request() req) {
        return req.user; 
    }


    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0), 
        });
        return { message: 'Cierre de sesión exitoso.' };
    }



    @Post('register')
    @UseInterceptors(FileInterceptor('fotoPerfil'))
    async register(
        @UploadedFile() fotoPerfil: Express.Multer.File,
        @Body() rawBody: Record<string, unknown>,
    ) {
        let horariosParsed: HorarioDto[] = [];
        let especialidadParsed: string[] | undefined = undefined;
        let rolAsignado: Rol = Rol.ADMINISTRATIVO; 
        

        if (rawBody.rol && Object.values(Rol).includes(rawBody.rol as Rol)) {
            rolAsignado = rawBody.rol as Rol;
        } else if (!rawBody.rol) {
            if (rawBody.matricula || rawBody.especialidad) {
                rolAsignado = Rol.MEDICO;
            } else {
                rolAsignado = Rol.ADMINISTRATIVO;
            }
        }
        

        if (rawBody.horarios && typeof rawBody.horarios === 'string') {
            try {
                horariosParsed = JSON.parse(rawBody.horarios as string) as HorarioDto[];
            } catch (e) {
                throw new BadRequestException('El campo horarios no es JSON válido');
            }
        }


        if (rawBody.especialidad) {
            const especialidadRaw = String(rawBody.especialidad);
            if (especialidadRaw.startsWith('[') && especialidadRaw.endsWith(']')) {
                try {
                    especialidadParsed = JSON.parse(especialidadRaw) as string[];
                } catch (e) { /* no-op */ }
            }
            if (!especialidadParsed || especialidadParsed.length === 0) {
                especialidadParsed = especialidadRaw.trim() !== '' ? [especialidadRaw.trim()] : undefined;
            }
        }

        const dto: CreateUserDto = {
            nombre: String(rawBody.nombre ?? ''),
            email: String(rawBody.email ?? ''),
            password: String(rawBody.password ?? ''),
            rol: rolAsignado,
            dni: String(rawBody.dni ?? ''),
            fechaNacimiento: String(rawBody.fechaNacimiento ?? ''),
            telefono: String(rawBody.telefono ?? ''),
            direccion: String(rawBody.direccion ?? ''),
            matricula: String(rawBody.matricula ?? ''),
            especialidad: especialidadParsed, 
            horarios: horariosParsed,
        };

        const finalDto = plainToInstance(CreateUserDto, dto);
        const errors = await validate(finalDto, { whitelist: true, forbidNonWhitelisted: true });

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        const result = await this.userService.crear(finalDto, fotoPerfil);
        
        return {
            statusCode: 201,
            message: 'Registro recibido. Revisa tu correo (si no lo ves, revisá spam).',
            user: result,
        };
    }
}