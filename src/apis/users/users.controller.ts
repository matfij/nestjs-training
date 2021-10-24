import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../utils/decorators/current-user.decorator';
import { AuthGuard } from '../../utils/guards/auth.guard';
import { Serialize } from '../../utils/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { SigninDto } from './dtos/signin.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
@ApiTags('users')
@ApiHeader({name: 'X-Key', description: 'Auth key'})
@ApiCookieAuth()
export class UsersController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Get('whoami')
    @UseGuards(AuthGuard)
    @ApiOkResponse({type: String})
    async whoami(@CurrentUser() user: string): Promise<string> {
        return user;
    }

    @Post('signup')
    @ApiCreatedResponse({type: UserDto})
    async signup(@Body() body: CreateUserDto, @Session() session: any): Promise<UserDto> {
        const user = await this.authService.signup(body);
        session.userId = user.id;

        return user;
    }

    @Post('signin')
    @ApiOkResponse({type: UserDto})
    async signin(@Body() body: SigninDto, @Session() session: any): Promise<UserDto> {
        const user = await this.authService.signin(body);
        session.userId = user.id;

        return user;
    }

    @Post('signout')
    async signout(@Session() session: any) {
        session.id = null;
    }

    @Post('create')
    @ApiOkResponse({type: UserDto})
    async create(@Body() body: CreateUserDto): Promise<UserDto> {
        return this.usersService.create(body);
    }
    
    @Get('get/:id')
    @ApiOkResponse({type: UserDto})
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return this.usersService.findOne(id);
    }

    @Get('get')
    @ApiOkResponse({type: UserDto, isArray: true})
    async findAll(@Body() body: GetUsersDto): Promise<UserDto[]> {
        return this.usersService.findAll(body);
    }

    @Patch('update/:id')
    @ApiOkResponse({type: UserDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<UserDto> {
        return this.usersService.update(id, body);
    }

    @Delete('delete/:id')
    @ApiOkResponse({type: UserDto})
    async remove(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return this.usersService.remove(id);
    }
}
