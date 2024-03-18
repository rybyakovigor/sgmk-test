// Core
import { NestFactory } from '@nestjs/core';

// App module
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
