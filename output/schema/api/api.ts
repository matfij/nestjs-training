export * from './reports.service';
import { ReportsService } from './reports.service';
export * from './reports.serviceInterface';
export * from './users.service';
import { UsersService } from './users.service';
export * from './users.serviceInterface';
export const APIS = [ReportsService, UsersService];
