import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserWatchedMovie } from './userWatchedMovie.entity';

@Injectable()
export class UserWatchedMovieService {
  constructor(
    @InjectRepository(UserWatchedMovie)
    private userWatchedMovieRepository: Repository<UserWatchedMovie>,

    private userService: UserService,
  ) {}

  async getAllWatchedMoviesIdsByUserId(userId: number): Promise<number[]> {
    const userWatchedMovies = await this.userWatchedMovieRepository.findBy({
      user: { id: userId },
    });

    return userWatchedMovies.map((movie) => movie.movieId);
  }

  async addWatchedMovieIdToUserByUserId(
    userId: number,
    movieId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingWatchedMovie =
      await this.userWatchedMovieRepository.findOne({
        where: { user, movieId },
      });

    if (existingWatchedMovie) {
      return;
    }

    const newWatchedMovie = this.userWatchedMovieRepository.create({
      user,
      movieId,
    });

    await this.userWatchedMovieRepository.save(newWatchedMovie);
  }

  async removeWatchedMovieIdToUserByUserId(
    userId: number,
    movieId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingWatchedMovie =
      await this.userWatchedMovieRepository.findOne({
        where: { user, movieId },
      });

    if (!existingWatchedMovie) {
      return;
    }

    await this.userWatchedMovieRepository.remove(existingWatchedMovie);
  }
}
