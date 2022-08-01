import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    async auth(@Request() req) {
        return this.authService.login(req.user);
    }
}
