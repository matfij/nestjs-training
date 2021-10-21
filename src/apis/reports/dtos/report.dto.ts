import { Expose, Transform } from "class-transformer";

export class ReportDto {

    @Expose()
    id: number;

    @Expose()
    approved: boolean;

    @Expose()
    brand: string;

    @Expose()
    model: string;

    @Expose()
    price: number;

    @Expose()
    year: number;

    @Expose()
    mileage: number;

    @Expose()
    @Transform(({obj}) => obj.user.id)
    userId: number;
}
