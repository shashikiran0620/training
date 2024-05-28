import { Body, Controller, HttpStatus, Inject, Logger, Post, UseGuards, forwardRef } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Controller('profile')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }
    @Post('login')
    public async getAccessTokenIfUserAuthorized(@Body() user: User): Promise<{ access_token: string }> {
        Logger.log(`Start AuthController : getAccessTokenIfUserAuthorized`)
        try {
            const userAuthorized = await this.authService.validateUserIsAuthorized(user);
            if (!userAuthorized) {
                throw new Error('Invalid credentials');
            }
            return this.authService.login(userAuthorized);
        }
        catch (err) {
            Logger.log(`Error in AuthController : getAccessTokenIfUserAuthorized`)
            HttpStatus.UNAUTHORIZED
        }
    }
    @Post('login/serviceAfterLogin')
    @UseGuards(JwtAuthGuard)
    public afterloginProfileService() : string {
        Logger.log(`Start AuthController : afterloginProfileService`)
        try {
            return 'hello you are authorized user'
        }
        catch (err) {
            Logger.log(`Error in AuthController : afterloginProfileService`)
            HttpStatus.INTERNAL_SERVER_ERROR
        }
    }

}
