import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    create(params: CreateUserDto) {
        const user = this.usersRepository.create(params);

        return this.usersRepository.save(user);
    }

    findOne(id: number) {
        if (!id) throw new NotFoundException();
        return this.usersRepository.findOne(id);
    }

    findAll(filterParams?: GetUsersDto) {
        if (!filterParams.removed) filterParams.removed = false;

        return this.usersRepository.find(filterParams);
    }

    async update(id: number, params: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException();

        Object.assign(user, params);
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException();
        
        Object.assign(user, {removed: true});
        return this.usersRepository.save(user);
    }
}
