import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestExtension } from 'src/interfaces/request-extension.interface';

export const CurrentUser = createParamDecorator(
    (_: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<RequestExtension>();
        return request.currentUser;
    }
);
