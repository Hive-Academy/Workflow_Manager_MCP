import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFileLoggerService } from './task-workflow/domains/reporting/services';

async function bootstrap() {
  // Create the global file logger BEFORE creating the app
  const globalLogger = new GlobalFileLoggerService();

  // Pass the logger to NestFactory.create to override ALL logging calls
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: globalLogger,
  });

  return app.close();
}

void bootstrap();
