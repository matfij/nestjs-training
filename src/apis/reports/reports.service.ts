import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { EstimateDto } from './dtos/estimate.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
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

    getEstimate(dto: GetEstimateDto): Promise<EstimateDto> {
        return this.reportsRepository.createQueryBuilder()
            .select('AVG(price)', 'price')
            // .where('approved IS TRUE')
            .andWhere('brand = :brand', {brand: dto.brand})
            .andWhere('model = :model', {model: dto.model})
            .andWhere('year - :year BETWEEN -5 AND 5', {year: dto.year})
            .orderBy('ABS(mileage - :mileage)', 'DESC').setParameters({mileage: dto.mileage})
            .limit(3)
            .getRawOne();
    }
}
