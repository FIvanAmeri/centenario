import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EntidadModule } from './entidad.module';
import { UserModule } from './modulos/user.module';
import { AuthModule } from './modulos/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME ?? 'usuario',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_NAME ?? 'centenario',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EntidadModule,
    UserModule,
    AuthModule, 
  ],
})
export class AppModule {}