import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  // Le indicas explícitamente “0.0.0.0” para que escuche en todas las interfaces
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS arrancado en puerto ${port}`);
}
bootstrap();
