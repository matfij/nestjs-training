import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    password?: string;
    
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    removed?: boolean;
}
