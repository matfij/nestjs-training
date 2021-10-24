import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserRole } from "../../../definitions/enums/user-role";

export class UserDto {

    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty({enum: UserRole})
    role: UserRole;
}
