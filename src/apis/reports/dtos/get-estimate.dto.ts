import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class GetEstimateDto {

    @IsString()
    @MaxLength(100)
    @ApiProperty()
    brand: string;
    
    @IsString()
    @MaxLength(100)
    @ApiProperty()
    model: string;

    @IsNumber()
    @Min(1900)
    @Max(2100)
    @ApiProperty()
    year: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    @ApiProperty()
    mileage: number;
}
