import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional } from "class-validator";

export class GetUsersDto {

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;
    
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    removed?: boolean;
}
