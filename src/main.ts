import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { winstonLogger } from '@utils/winston.util';
import { HttpExceptionFilter } from '@utils/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  } else {
    app.use(helmet({ contentSecurityPolicy: false }));
    app.enableCors({
      origin: [],
      credentials: true,
    });
  }

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(PORT, '번 포트에 서버 실행');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
