import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserFavoriteMovie } from './userFavoriteMovie.entity';

@Injectable()
export class UserFavoriteMovieService {
  constructor(
    @InjectRepository(UserFavoriteMovie)
    private userFavoriteMovieRepository: Repository<UserFavoriteMovie>,

    private userService: UserService,
  ) {}

  async getAllMoviesIdsByUserId(userId: number): Promise<number[]> {
    const userFavoriteMovies = await this.userFavoriteMovieRepository.findBy({
      user: { id: userId },
    });

    return userFavoriteMovies.map((movie) => movie.movieId);
  }

  async addMovieIdToUserByUserId(
    userId: number,
    movieId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingFavoriteMovie =
      await this.userFavoriteMovieRepository.findOne({
        where: { user, movieId },
      });

    if (existingFavoriteMovie) {
      return;
    }

    const newFavoriteMovie = this.userFavoriteMovieRepository.create({
      user,
      movieId,
    });

    await this.userFavoriteMovieRepository.save(newFavoriteMovie);
  }

  async removeMovieIdToUserByUserId(
    userId: number,
    movieId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingFavoriteMovie =
      await this.userFavoriteMovieRepository.findOne({
        where: { user, movieId },
      });

    if (!existingFavoriteMovie) {
      return;
    }

    await this.userFavoriteMovieRepository.remove(existingFavoriteMovie);
  }
}
