import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    forceCloseConnections: true,
  });
  //app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useWebSocketAdapter(new IoAdapter(app));
  app.enableShutdownHooks();
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
