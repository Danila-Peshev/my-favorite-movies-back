import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteGenre } from './favorite-genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(FavoriteGenre)
    private genreRepository: Repository<FavoriteGenre>,
  ) {}

  async findUserGenres(userId: number): Promise<FavoriteGenre[]> {
    return this.genreRepository.findBy({
      user: { id: userId },
    });
  }

  async addUserGenre(
    userId: number,
    genreId: number,
  ): Promise<FavoriteGenre> {
    const existingFavoriteGenre = await this.genreRepository.findOne({
      where: { user: { id: userId }, genreId },
    });
    if (!existingFavoriteGenre) {
      const newFavoriteGenre = this.genreRepository.create({
        user: {id: userId},
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

}
