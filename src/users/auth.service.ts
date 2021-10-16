import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SigninDto } from "./dtos/signin.dto";
import { UsersService } from "./users.service";

const crypt = promisify(scrypt);

@Injectable()
export class AuthService {

    private readonly PasswordConfig = {
        saltLength: 16,
        hashLength: 64,
        encoding: 'hex' as BufferEncoding,
        split: '.',
    };

    constructor(
        private usersService: UsersService
    ) {}

    async signup(params: CreateUserDto) {
        const users = await this.usersService.findAll({email: params.email});
        if (users.length) throw new BadRequestException('email occupied');

        const salt = randomBytes(this.PasswordConfig.saltLength).toString(this.PasswordConfig.encoding);
        const hash = (await crypt(params.password, salt, this.PasswordConfig.hashLength)) as Buffer;
        const result = `${salt} ${this.PasswordConfig.split} ${hash.toString(this.PasswordConfig.encoding)}`;

        return this.usersService.create({...params, password: result});
    }

    async signin(params: SigninDto) {
        const [user] = await this.usersService.findAll({email: params.email});
        if (!user) throw new NotFoundException('user not found');

        const [salt, storedHash] = user.password.split(this.PasswordConfig.split);
        const hash = (await crypt(params.password, salt, this.PasswordConfig.hashLength)) as Buffer;
        
        if (storedHash !== hash.toString(this.PasswordConfig.encoding)) throw new BadRequestException('incorrect password');
        return user;
    }
}
