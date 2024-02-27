import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UserModule } from 'src/user/user.module';

export const initializeSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [UserModule],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const swaggerCustomOptions: SwaggerCustomOptions = {
    explorer: true,
    customSiteTitle: 'My App documentation',
    swaggerOptions: {
      urls: [
        {
          url: 'http://localhost:3005/api-docs-json',
          name: 'earthpaper',
        },
        {
          url: 'http://localhost:3005/api-docs-user-json',
          name: 'earthpaper-user',
        },
      ],
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  const document_user = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
  SwaggerModule.setup(
    'api-docs-user',
    app,
    document_user,
    swaggerCustomOptions,
  );
};
