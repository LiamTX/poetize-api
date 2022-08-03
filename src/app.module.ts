import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PoemModule } from './poem/poem.module';
import { Poem } from './poem/poem.entity';

require('dotenv').config();

console.log(process.env.JWT_SECRET)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [User, Poem],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
    }),
    UserModule,
    AuthModule,
    PoemModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
