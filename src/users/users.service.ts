import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    create(email: string, password: string) {
        const user = this.usersRepository.create({email, password});

        return this.usersRepository.save(user);
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    find(email?: string) {
        return this.usersRepository.find({email});
    }

    async update(id: number, params: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) throw new Error('User not found');

        Object.assign(user, params);
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) throw new Error('User not found');

        return this.usersRepository.remove(user);
    }
}
