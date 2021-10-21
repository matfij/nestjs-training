import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Report) private reportsRepository: Repository<Report>
    ) {}

    createReport(dto: CreateReportDto, user: User) {
        const report = this.reportsRepository.create(dto);
        report.user = user;

        return this.reportsRepository.save(report);
    }

    async approveReport(id: string, dto: ApproveReportDto) {
        const report = await this.reportsRepository.findOne(id);
        if (!report) throw new NotFoundException();

        report.approved = dto.approved;
        console.log(report)
        
        return this.reportsRepository.save(report);
    }
}
