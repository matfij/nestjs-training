import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './apis/reports/report.entity';
import { ReportsModule } from './apis/reports/reports.module';
import { User } from './apis/users/user.entity';
import { UsersModule } from './apis/users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule, 
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report]
        };
      }
    })
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
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    consumer.apply(cookieSession({keys: [sessionKey]})).forRoutes('*');
  }
}
