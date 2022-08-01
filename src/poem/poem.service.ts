import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ICreatePoemDto } from './dto/create-poem.dto';
import { IFindAllPoemsFilterDto } from './dto/find-all-poems.filter.dto';
import { IUpdatePoemDto } from './dto/update-poem.dto';
import { Poem } from './poem.entity';

@Injectable()
export class PoemService {
    constructor(
        @InjectRepository(Poem)
        private poemRepository: Repository<Poem>,
        private userService: UserService
    ) { }

    async create({ title, description, userId }: ICreatePoemDto): Promise<Poem> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return await this.poemRepository.save({ title, description, user });
    }

    async findAll(): Promise<Poem[]> {
        return await this.poemRepository.find({
            relations: ['user', 'likes']
        });
    }

    async update(poemId: string, userId: string, data: IUpdatePoemDto) {
        const poem = await this.poemRepository.findOne({ relations: ['user'], where: { id: poemId } });
        if (poem.user.id !== userId) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return await this.poemRepository.update(poemId, data);
    }

    async delete(poemId: string, userId: string) {
        const poem = await this.poemRepository.findOne({ relations: ['user'], where: { id: poemId } });
        if (poem.user.id !== userId) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return await this.poemRepository.delete(poem.id);
    }

    async likePoem(poemId: string, userId: string) {
        const poem = await this.poemRepository.findOne({ relations: ['likes'], where: { id: poemId } });
        if (!poem) {
            throw new HttpException('poem_not_found', HttpStatus.NOT_FOUND);
        }

        const user = await this.userService.findById(userId);
        const userExistsOnLikeArr = poem.likes.find(e => e.id == user.id);
        if (userExistsOnLikeArr?.id) {
            poem.likes.splice(poem.likes.indexOf(userExistsOnLikeArr), 1);
        } else {
            poem.likes.push(user);
        }

        const updatedPoemEntity = await this.poemRepository.preload(poem);
        return await this.poemRepository.save(updatedPoemEntity);
    }
}
