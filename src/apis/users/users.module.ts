import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserInterceptor } from 'src/utils/interceptors/current-user.interceptor';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }
  ]
})
export class UsersModule {}
