import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "*",
  })

  app.useStaticAssets(join(__dirname, '..', '/uploads/'));

  await app.listen(3000);
}
bootstrap();
