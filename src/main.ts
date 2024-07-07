import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  console.log('check service', configService);
  console.log('check port', configService.get<number>('port'));
  await app.listen(configService.get<number>('port'));
}

bootstrap();
