import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseOptions } from '@config/database.config';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { LoggerMiddleware } from '@middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({ ...databaseOptions }),
    UserModule,
    /*   RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'user',
            module: UserModule,
          },
        ],
      },
    ]), */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
