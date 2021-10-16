import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
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

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user: string) {
        return user;
    }

    @Post('signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body);
        session.id = user.id;

        return user;
    }

    @Post('signin')
    async signin(@Body() body: SigninDto, @Session() session: any) {
        const user = await this.authService.signin(body);
        session.id = user.id;

        return user;
    }

    @Post('signout')
    signout(@Session() session: any) {
        session.id = null;
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

    @Post('demo/:c')
    setC(@Param('c') c: string, @Session() session: any) {
        session.c = c;
    }

    @Get('demo')
    getC(@Session() session: any) {
        return session;
    }
}
