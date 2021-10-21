import { Expose } from "class-transformer";
import { UserRole } from "src/definitions/enums/user-role";

export class UserDto {

    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    role: UserRole;
}
