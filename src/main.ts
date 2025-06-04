import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Reemplaza con el origen de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT ?? 3000
    await app.listen(port, '0.0.0.0');
  console.log(`NestJS arrancado en puerto ${port}`);
}
bootstrap();
