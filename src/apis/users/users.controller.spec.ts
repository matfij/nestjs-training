import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { GetUsersDto } from './dtos/get-users.dto';
import { SigninDto } from './dtos/signin.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      findOne: (id: number) => Promise.resolve({id: id, email: 'mail@com', password: 'pass'} as User),
      findAll: (dto?: GetUsersDto) => Promise.resolve([{email: dto.email, password: 'pass'} as User]),
    };

    authService = {
      signin: (dto: SigninDto) => Promise.resolve({id: 1, email: dto.email, password: dto.password} as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: AuthService, useValue: authService },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('receive a list of user with given email', async () => {
    const users = await controller.findAll({email: 'mail@com'});

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('mail@com');
  });

  it('receive a user with given id', async () => {
    const user = await controller.findOne(1);

    expect(user.id).toEqual(1);
  });

  it('fail to receive a user with given not existing id', async () => {
    usersService.findOne = () => null;
    const user = await controller.findOne(1);

    try {
      expect(user.id).toEqual(1);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }
  });

  it('sigin success, session setup', async () => {
    const session = {userId: null};
    const user = await controller.signin({email: 'mail.com', password: '123'}, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
