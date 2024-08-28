import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteGenre } from './userFavoriteGenre.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserFavoriteGenreService {
  constructor(
    @InjectRepository(UserFavoriteGenre)
    private userFavoriteGenreRepository: Repository<UserFavoriteGenre>,

    private userService: UserService,
  ) {}

  async getAllGenresIdsByUserId(userId: number): Promise<number[]> {
    const userFavoriteGenres = await this.userFavoriteGenreRepository.findBy({
      user: { id: userId },
    });

    return userFavoriteGenres.map((genre) => genre.genreId);
  }

  async addGenreIdToUserByUserId(
    userId: number,
    genreId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingFavoriteGenre =
      await this.userFavoriteGenreRepository.findOne({
        where: { user, genreId },
      });

    if (existingFavoriteGenre) {
      return;
    }

    const newFavoriteGenre = this.userFavoriteGenreRepository.create({
      user,
      genreId,
    });

    await this.userFavoriteGenreRepository.save(newFavoriteGenre);
  }

  async removeGenreIdToUserByUserId(
    userId: number,
    genreId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingFavoriteGenre =
      await this.userFavoriteGenreRepository.findOne({
        where: { user, genreId },
      });

    if (!existingFavoriteGenre) {
      return;
    }

    await this.userFavoriteGenreRepository.remove(existingFavoriteGenre);
  }
}
