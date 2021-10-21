import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRole } from "src/definitions/enums/user-role";
import { RequestExtension } from "src/definitions/interfaces/request-extension.interface";

export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestExtension>();
        if (!request.currentUser) return false;

        return request.currentUser.role === UserRole.Admin;
    }
}
