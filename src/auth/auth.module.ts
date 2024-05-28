import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../users/auth.service';
import { JwtStrategy } from '../users/jwt.strategy';
import { AuthController } from 'src/users/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.model';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secret', // Use a secure key
            signOptions: { expiresIn: '60m' },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
