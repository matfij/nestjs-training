import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(SerializeInterceptor)
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Post('create')
    create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Get('get/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Get('get')
    findAll() {
        return this.usersService.findAll();
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
