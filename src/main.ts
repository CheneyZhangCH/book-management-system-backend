import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: '*', // 允许所有来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
    allowedHeaders: 'Content-Type, Accept', // 允许的请求头
    credentials: true, // 允许携带凭据
  });
  // 设置静态资源目录
  app.useStaticAssets(join(__dirname, '../uploads'), {
    prefix: '/uploads', // 设置访问前缀
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
