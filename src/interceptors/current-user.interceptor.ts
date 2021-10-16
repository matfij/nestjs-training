import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestExtension } from 'src/interfaces/request-extension.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(
    private usersService: UsersService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<RequestExtension>();
    const id = request.session.id;

    if (id) {
      const user = await this.usersService.findOne(id);
      request.currentUser = user;
    }

    return next.handle();
  }
}
