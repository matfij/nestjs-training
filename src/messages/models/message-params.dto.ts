import { IsNumber, IsOptional, IsString } from "class-validator";

export class MessageParams {


    @IsOptional() @IsNumber()
    id?: number;

    @IsString()
    author: string;

    @IsString()
    body: string;

    @IsString()
    age: string;
}
