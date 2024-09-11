import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteMovie } from './favorite-movie.entity';
import { MovieService } from './favorite-movie.service';
import { MovieResolver } from './favorite-movie.resolver';

@Module({
  controllers: [],
  providers: [MovieService, MovieResolver],
  imports: [TypeOrmModule.forFeature([FavoriteMovie])],
})
export class FavoriteMovieModule {}
