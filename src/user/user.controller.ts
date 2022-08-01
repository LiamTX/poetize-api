import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { ICreateUserDto } from './dto/create-user.dto';
import { IUpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() data: ICreateUserDto): Promise<User> {
        return await this.userService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: IUpdateUserDto) {
        return await this.userService.update(id, data);
    }
}
