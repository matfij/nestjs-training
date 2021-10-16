
import { UserDto } from "src/apis/users/dtos/user.dto";
import { SessionExtension } from "./session-extension.interface";

export interface RequestExtension {
    session?: SessionExtension;
    currentUser?: UserDto;
}
