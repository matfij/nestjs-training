import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './apis/reports/report.entity';
import { ReportsModule } from './apis/reports/reports.module';
import { User } from './apis/users/user.entity';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    UsersModule, 
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        User,
        Report
      ],
      synchronize: true
    }),
  ],
  providers: [],
})
export class AppModule {}
