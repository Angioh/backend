// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS ampliada:
  const corsConfig: CorsOptions = {
    origin: 'http://localhost:4200',                // Origen permitido
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS,PATCH',    // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Incluye 'Authorization'
    credentials: true                               // Permite cookies/credenciales
  };

  app.enableCors(corsConfig); // :contentReference[oaicite:2]{index=2}

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
