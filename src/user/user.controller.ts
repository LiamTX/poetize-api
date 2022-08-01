import { Body, Controller, Post } from '@nestjs/common';
import { ICreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() data: ICreateUserDto): Promise<User> {
        return await this.userService.create(data);
    }
}
