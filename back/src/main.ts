import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as dotenv from 'dotenv'; 
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());


  app.use('/uploads', (await import('express')).static(join(process.cwd(), 'uploads')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('IA2-GE Sistemas - API')
    .setDescription('API central para la gestión de proyectos de sistemas (2 Iván, 2 Agustín, Emi).')
    .setVersion('1.0')
    .addTag('sistemas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`🚀 Backend Centenario corriendo en http://localhost:${port}`);
  console.log(`📖 Documentación Swagger disponible en http://localhost:${port}/docs`);
}
bootstrap();