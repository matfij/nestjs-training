import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateReportDto {

    @IsNumber()
    @Min(0)
    @Max(10000000)
    price: number;

    @IsString()
    @MaxLength(100)
    brand: string;
    
    @IsString()
    @MaxLength(100)
    model: string;

    @IsNumber()
    @Min(1900)
    @Max(2100)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    mileage: number;
}
