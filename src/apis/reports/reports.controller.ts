import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../utils/decorators/current-user.decorator';
import { AuthGuard } from '../../utils/guards/auth.guard';
import { ModeratorGuard } from '../../utils/guards/moderator.guard';
import { Serialize } from '../../utils/interceptors/serialize.interceptor';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
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

    @Get('estimate')
    getEstimate(@Body() dto: GetEstimateDto) {
        return  this.reportsService.getEstimate(dto);
    }
}
