import { Body, Controller, Delete, Param, Post, Put, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ICreateUserDto } from './dto/create-user.dto';
import { IUpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async create(@Body() data: ICreateUserDto): Promise<User> {
        return await this.userService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Request() req, @Body() data: IUpdateUserDto) {
        console.log(req.user)
        return await this.userService.update(req.user.userId, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(@Request() req) {
        return await this.userService.delete(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }
}
