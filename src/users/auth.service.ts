import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

const crypt = promisify(scrypt);

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService
    ) {}

    async signup(params: CreateUserDto) {
        const users = await this.usersService.findAll({email: params.email});
        if (users.length) throw new BadRequestException('email occupied');

        const salt = randomBytes(16).toString('hex');
        const hash = (await crypt(params.password, salt, 64)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        return this.usersService.create({...params, password: result});
    }

    signin(email: string, password: string) {

    }
}
