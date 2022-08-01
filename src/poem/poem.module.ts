import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { PoemController } from './poem.controller';
import { Poem } from './poem.entity';
import { PoemService } from './poem.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Poem])],
  controllers: [PoemController],
  providers: [PoemService]
})
export class PoemModule {}
