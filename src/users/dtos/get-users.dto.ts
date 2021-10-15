import { IsBoolean, IsEmail, IsOptional } from "class-validator";

export class GetUsersDto {

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    removed?: boolean;
}
