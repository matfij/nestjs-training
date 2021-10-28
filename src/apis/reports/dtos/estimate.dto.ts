import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class EstimateDto {

    @Expose()
    @ApiProperty()
    price: number;
}
