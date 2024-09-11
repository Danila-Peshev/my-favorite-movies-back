import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteMovie } from './favorite-movie.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private movieRepository: Repository<FavoriteMovie>,
  ) {}

  async findUserMovies(userId: number): Promise<FavoriteMovie[]> {
    return this.movieRepository.findBy({
      user: { id: userId },
    });
  }

  async toggleUserMovie(
    userId: number,
    movieId: number,
  ): Promise<MutationResult> {
    const existingFavoriteMovie = await this.movieRepository.findOne({
      where: { user: { id: userId }, movieId },
    });
    if (existingFavoriteMovie) {
      await this.movieRepository.delete({ movieId, user: { id: userId } });
    } else {
      const newFavoriteMovie = this.movieRepository.create({
        user: { id: userId },
        movieId,
        isWatched: false,
      });
      await this.movieRepository.save(newFavoriteMovie);
    }
    return { success: true };
  }

  async toggleWatchMovie(
    userId: number,
    movieId: number,
  ): Promise<FavoriteMovie> {
    const existingFavoriteMovie = await this.movieRepository.findOne({
      where: { user: { id: userId }, movieId },
    });
    const isWatched = existingFavoriteMovie.isWatched;
    existingFavoriteMovie.isWatched = !isWatched;
    return await this.movieRepository.save(existingFavoriteMovie);
  }
}
