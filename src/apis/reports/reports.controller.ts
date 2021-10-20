import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard)
@Serialize(ReportDto)
export class ReportsController {

    constructor(
        private reportsService: ReportsService,
    ) {}

    @Post('create')
    createReport(@Body() dto: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(dto, user);
    }
}
