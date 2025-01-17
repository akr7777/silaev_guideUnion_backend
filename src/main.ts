import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.CORS_ORIGINS.split(',')
    .map(origin => origin.trim());
  console.log(allowedOrigins, 'allowedOrigins');

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.APP_PORT);
}

console.log('process.env.APP_PORT - ', process.env.APP_PORT);
bootstrap();
