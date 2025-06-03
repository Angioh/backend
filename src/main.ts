import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const whitelist = ['http://localhost:4200', 'https://admin.frontend.com'];
app.enableCors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Permitir la solicitud
    } else {
      callback(new Error('No permitido por CORS')); // Denegar la solicitud
    }
  },
});

}
bootstrap();
