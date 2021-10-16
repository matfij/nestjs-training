import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestExtension } from 'src/definitions/interfaces/request-extension.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestExtension>();

    return !!request.session.id;
  }
}
