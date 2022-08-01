import { Controller, Post, UseGuards, Request, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUpdatePoemDto } from './dto/update-poem.dto';
import { Poem } from './poem.entity';
import { PoemService } from './poem.service';

@UseGuards(JwtAuthGuard)
@Controller('poem')
export class PoemController {
    constructor(private poemService: PoemService) { }

    @Get()
    async findAll(): Promise<Poem[]> {
        return await this.poemService.findAll();
    }

    @Post()
    async create(@Request() req, @Body() { title, description }: { title: string, description: string }): Promise<Poem> {
        return await this.poemService.create({ title, description, userId: req.user.userId });
    }

    @Put(':id')
    async update(@Request() req, @Param('id') poemId: string, data: IUpdatePoemDto) {
        return await this.poemService.update(poemId, req.user.userId, data);
    }

    @Delete(':id')
    async delete(@Request() req, @Param('id') poemId: string) {
        return await this.poemService.delete(poemId, req.user.userId);
    }

    @Post(':id')
    async likePoem(@Request() req, @Param('id') poemId: string) {
        return await this.poemService.likePoem(poemId, req.user.userId);
    }
}
