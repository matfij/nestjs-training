import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './apis/reports/reports.module';
import { UsersModule } from './apis/users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule, 
    ReportsModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }
  ],
})
export class AppModule {

  constructor(
    private configService: ConfigService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    /**
     * Nest execution: middlewares -> guards -> interceptors -> handler -> interceptors -> response
     */
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    consumer.apply(cookieSession({keys: [sessionKey]})).forRoutes('*');
  }
}
