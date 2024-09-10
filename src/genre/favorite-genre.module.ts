import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteGenre } from './favorite-genre.entity';
import { GenreService } from './favorite-genre.service';
import { GenreResolver } from './favorite-genre.resolver';

@Module({
  controllers: [],
  providers: [GenreService, GenreResolver],
  imports: [TypeOrmModule.forFeature([FavoriteGenre])],
})
export class FavoriteGenreModule {}
