import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { SigninDto } from './dtos/signin.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Post('signup')
    signup(@Body() body: CreateUserDto) {
        return this.authService.signup(body);
    }

    @Post('signin')
    signin(@Body() body: SigninDto) {
        return this.authService.signin(body);
    }

    @Post('create')
    create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Get('get/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Get('get')
    findAll(@Body() body: GetUsersDto) {
        return this.usersService.findAll(body);
    }

    @Patch('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }

    @Delete('delete/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
