import { UserDto } from "src/users/dtos/user.dto";
import { SessionExtension } from "./session-extension.interface";

export interface RequestExtension {
    session?: SessionExtension;
    currentUser?: UserDto;
}
