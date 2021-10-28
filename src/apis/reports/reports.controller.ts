import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../utils/decorators/current-user.decorator';
import { AuthGuard } from '../../utils/guards/auth.guard';
import { ModeratorGuard } from '../../utils/guards/moderator.guard';
import { Serialize } from '../../utils/interceptors/serialize.interceptor';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { EstimateDto } from './dtos/estimate.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard)
@ApiTags('reports')
@ApiCookieAuth()
export class ReportsController {
    
    constructor(
        private reportsService: ReportsService,
    ) {}

    @Post('create')
    @Serialize(ReportDto)
    @ApiOkResponse({type: ReportDto})
    async createReport(@Body() dto: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(dto, user);
    }

    @Patch('approve/:id')
    @Serialize(ReportDto)
    @UseGuards(ModeratorGuard)
    @ApiOkResponse({type: ReportDto})
    async approveReport(@Param('id') id: string, @Body() dto: ApproveReportDto) {
        return this.reportsService.approveReport(id, dto);
    }

    @Get('estimate')
    @Serialize(EstimateDto)
    @ApiOkResponse({type: EstimateDto})
    async getEstimate(@Body() dto: GetEstimateDto) {
        return this.reportsService.getEstimate(dto);
    }
}
