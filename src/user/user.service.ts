import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { ICreateUserDto } from './dto/create-user.dto';
import { IResetUserPasswordDto } from './dto/reset-user-password.dto';
import { IUpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(data: ICreateUserDto): Promise<User> {
        const user = await this.userRepository.save(
            this.userRepository.create(data)
        );
        delete user.password;

        return user;
    }

    async update(id: string, data: IUpdateUserDto) {
        return await (await this.userRepository.update(id, data)).raw;
    }

    async delete(id: string) {
        return await this.userRepository.delete(id);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username } });
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async findAll() {
        return await this.userRepository.find({ relations: ['likedPoems'] });
    }

    async resetPassword(userId: string, data: IResetUserPasswordDto) {
        const { oldPassword, newPassword } = data;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }

        if (!compareSync(oldPassword, user.password)) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }

        user.password = hashSync(newPassword, genSaltSync());
        return await (await this.userRepository.update(user.id, user)).raw;
    }
}
