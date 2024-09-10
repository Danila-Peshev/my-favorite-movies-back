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
    @InjectRepository(FavoriteGenre)
    private genreRepository: Repository<FavoriteGenre>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUserGenres(userId: number): Promise<FavoriteGenre[]> {
    const genres: FavoriteGenre[] = await this.genreRepository.findBy({
      user: { id: userId },
    });
    return genres;
  }

  async findUserMovies(userId: number): Promise<FavoriteMovie[]> {
    const movies: FavoriteMovie[] = await this.movieRepository.findBy({
      user: { id: userId },
    });
    return movies;
  }

  async addUserGenre(
    userId: number,
    genreId: number,
  ): Promise<FavoriteGenre> {
    const user: User = await this.userRepository.findOneBy({ id: userId });
    const existingFavoriteGenre = await this.genreRepository.findOne({
      where: { user: { id: userId }, genreId },
    });
    if (!existingFavoriteGenre) {
      const newFavoriteGenre = this.genreRepository.create({
        user,
        genreId,
      });
      return await this.genreRepository.save(newFavoriteGenre);
    }
  }

  async removeUserGenre(
    userId: number,
    genreId: number,
  ): Promise<string> {
    const existingFavoriteGenre = await this.genreRepository.findOne({
      where: { user: { id: userId }, genreId },
    });
    if (existingFavoriteGenre) {
      await this.genreRepository.delete({ genreId });
      return 'Genre has been removed';
    }
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
