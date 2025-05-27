import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GlobalFileLoggerService } from './task-workflow/domains/reporting/services';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  // Set up global file logger
  // const globalLogger = new GlobalFileLoggerService();
  // app.useLogger(globalLogger);

  return app.close();
}

void bootstrap();
