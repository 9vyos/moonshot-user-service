import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'localhost',
  //       port: 3002,
  //     },
  //   },
  // );
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
