import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async validateUserIsAuthorized(user: User): Promise<any> {
        const getUser = await this.usersRepository.findOneBy(user)
        if (user.email == getUser.email && bcrypt.compare(user.password, getUser.password)) {
            return { userId: getUser.id, username: getUser.firstName };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
