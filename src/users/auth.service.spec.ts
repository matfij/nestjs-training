import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import exp from 'constants';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {

    let service: AuthService;
    let _usersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];

        _usersService = {
            findAll: (params?: GetUsersDto) => {
                const filteredUsers= users.filter(x => x.email === params.email);
                return Promise.resolve(filteredUsers);
            },
            create: (params: CreateUserDto) => {
                const user = {...params, id: Math.ceil(Math.random() * 100000)} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        };
        
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: _usersService }
            ],
        }).compile();
        
        service = module.get<AuthService>(AuthService);
    });

    it('create auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates new user', async () => {
        const user = await service.signup({email: 'test@mail.com', password: 'pass1234'});
        const [salt, hash] = user.password.split('.');

        expect(user.email).toEqual('test@mail.com');
        expect(user.password).not.toEqual('pass1234');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('create user with occupied email', async () => {
        await service.signup({email: 'test@mail.com', password: 'pass1234'});

        try {
            await service.signup({email: 'test@mail.com', password: 'pass1234'});
            fail();
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
        }
    });

    it('sign in with not existing credentials', async () => {
        try {
            await service.signin({email: 'test@mail.com', password: 'pass1234'});
            fail();
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
        }
    });
    
    it('sign in with incorrect credentials', async () => {
        await service.signup({email: 'test@mail.com', password: 'pass1234'});
        
        try {
            await service.signin({email: 'test@mail.com', password: 'badpass1234'});
            fail();
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
        }
    });

    it('sign in with correct credentials', async () => {
        await service.signup({email: 'test@mail.com', password: 'pass1234'});
        
        const user = await service.signin({email: 'test@mail.com', password: 'pass1234'});

        expect(user).toBeDefined();
    });
})
