import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteMovie } from './favorite-movie.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([FavoriteMovie])],
})
export class FavoriteMovieModule {}
