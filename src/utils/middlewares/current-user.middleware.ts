import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { UsersService } from "../../apis/users/users.service";
import { RequestExtension } from "../../definitions/interfaces/request-extension.interface";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(
        private usersService: UsersService
    ) {}

    async use(request: RequestExtension, response: Response, next: NextFunction) {
        const userId = request.session.userId;

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        next();
    }
}