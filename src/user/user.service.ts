import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteGenre, FavoriteMovie, User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FavoriteMovie)
    private movieRepository: Repository<FavoriteMovie>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUserMovies(userId: number): Promise<FavoriteMovie[]> {
    const movies: FavoriteMovie[] = await this.movieRepository.findBy({
      user: { id: userId },
    });
    return movies;
  }

  async addUserMovie(
    userId: number,
    movieId: number,
  ): Promise<FavoriteMovie> {
    const user: User = await this.userRepository.findOneBy({ id: userId });
    const existingFavoriteMovie = await this.movieRepository.findOne({
      where: { user: { id: userId }, movieId },
    });
    if (!existingFavoriteMovie) {
      const newFavoriteMovie = this.movieRepository.create({
        user,
        movieId,
        isWatched: false,
      });
      return await this.movieRepository.save(newFavoriteMovie);
    }
  }

  async removeUserMovie(
    userId: number,
    movieId: number,
  ): Promise<string> {
    const existingFavoriteMovie = await this.movieRepository.findOne({
      where: { user: { id: userId }, movieId },
    });
    if (existingFavoriteMovie) {
      await this.movieRepository.delete({ movieId });
      return 'Movie has been removed';
    }
  }

  async toggleUserMovie(
    userId: number,
    movieId: number,
  ): Promise<FavoriteMovie> {
    const existingFavoriteMovie = await this.movieRepository.findOne({
      where: { user: { id: userId }, movieId },
    });
    if (existingFavoriteMovie) {
      existingFavoriteMovie.isWatched = true;
    } else {
      existingFavoriteMovie.isWatched = false;
    }
    return await this.movieRepository.save(existingFavoriteMovie);
  }

}
