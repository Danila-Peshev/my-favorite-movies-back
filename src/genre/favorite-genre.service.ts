import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteGenre } from './favorite-genre.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';

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

  async toggleUserGenre(
    userId: number,
    genreId: number,
  ): Promise<MutationResult> {
    const existingFavoriteGenre = await this.genreRepository.findOne({
      where: { user: { id: userId }, genreId },
    });
    if (existingFavoriteGenre) {
      await this.genreRepository.delete({ genreId, user: { id: userId } });
    } else {
      const newFavoriteGenre = this.genreRepository.create({
        user: { id: userId },
        genreId,
      });
      await this.genreRepository.save(newFavoriteGenre);
    }
    return { success: true };
  }
}
