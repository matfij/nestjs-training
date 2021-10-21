import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { ModeratorGuard } from 'src/utils/guards/moderator.guard';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
    
    constructor(
        private reportsService: ReportsService,
    ) {}

    @Post('create')
    @Serialize(ReportDto)
    createReport(@Body() dto: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(dto, user);
    }

    @Patch('approve/:id')
    @UseGuards(ModeratorGuard)
    approveReport(@Param('id') id: string, @Body() dto: ApproveReportDto) {
        return this.reportsService.approveReport(id, dto);
    }
}
