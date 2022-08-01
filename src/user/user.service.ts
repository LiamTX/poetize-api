import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDto } from './dto/create-user.dto';
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
}
