import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://xn----ctbbic5aaesigbxmc4a4kmey.su',
      'https://вольные-экскурсоводы.su',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.APP_PORT);
}

console.log('process.env.APP_PORT - ', process.env.APP_PORT);
bootstrap();
