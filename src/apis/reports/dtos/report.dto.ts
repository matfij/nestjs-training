import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ReportDto {

    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    approved: boolean;

    @Expose()
    @ApiProperty()
    brand: string;

    @Expose()
    @ApiProperty()
    model: string;

    @Expose()
    @ApiProperty()
    price: number;

    @Expose()
    @ApiProperty()
    year: number;

    @Expose()
    @ApiProperty()
    mileage: number;

    @Expose()
    @Transform(({obj}) => {console.log(obj); obj.user.id})
    @ApiProperty()
    userId: number;
}
