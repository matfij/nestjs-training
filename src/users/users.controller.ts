import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Post('create')
    create(@Body() params: CreateUserDto) {
        this.usersService.create(params.email, params.password);
    }
}
