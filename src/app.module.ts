import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ReportsModule } from './apis/reports/reports.module';
import { UsersModule } from './apis/users/users.module';

const cookieSession = require('cookie-session');

const sqliteOpts = {
  type: 'sqlite',
  database: 'db.sqlite',
  autoLoadEntities: true,
  synchronize: true
};
const postresOpts = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true
};
const ormOptions = process.env.NODE_ENV === 'gen' ? sqliteOpts : postresOpts;

console.log(ormOptions)

@Module({
  imports: [
    UsersModule, 
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(ormOptions as TypeOrmModuleOptions),
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
     * Nest execution: middlewares -> guards -> interceptors -> controller -> interceptors -> response
     */
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    consumer.apply(cookieSession({keys: [sessionKey]})).forRoutes('*');
  }
}
