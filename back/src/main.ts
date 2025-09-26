import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { ValidationPipe } from '@nestjs/common'; // <-- Importación necesaria

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  // ------------------------------------------------------------------
  // Configura el ValidationPipe globalmente con transform: true
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ¡CRUCIAL para que @Type funcione en el DTO!
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // ------------------------------------------------------------------

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('🟢 Conexión a la base de datos establecida con éxito');
  } else {
    console.error('🔴 La base de datos no está inicializada');
    process.exit(1);
  }

  await app.listen(port);
  console.log(`🚀 Backend Centenario corriendo en http://localhost:${port}`);
}
bootstrap();