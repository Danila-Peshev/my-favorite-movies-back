import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenre, FavoriteMovie, User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteMovie, FavoriteGenre])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
