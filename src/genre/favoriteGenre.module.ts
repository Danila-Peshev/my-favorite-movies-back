import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteGenre } from './favoriteGenre.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([FavoriteGenre])],
})
export class UserFavoriteGenreModule {}
