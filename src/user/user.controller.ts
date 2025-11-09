import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        const { email, password } = body;

        if (!email || !password)
            return { error: 'Email and password are required' };

        return await this.userService.register(email, password);
    }
}
