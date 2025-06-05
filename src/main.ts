// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) Configuración sencilla permitiendo solo el origen de Angular (localhost:4200)
  const corsConfig: CorsOptions = {
    origin: 'http://localhost:4200',         // <-- Origen permitido
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',  // Otras cabeceras que Angular envíe
    credentials: true                        // Si usas cookies o credenciales
  };

  app.enableCors(corsConfig);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
