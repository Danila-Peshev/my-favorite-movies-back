import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserFavoriteGenreService } from './userFavoriteGenre.service';

@Controller('user')
export class UserFavoriteGenreController {
  constructor(private userFavoriteGenreService: UserFavoriteGenreService) {}

  @Get(':userId/genres')
  getAllGenresIdsByUserId(@Param('userId') userId: number): Promise<number[]> {
    return this.userFavoriteGenreService.getAllGenresIdsByUserId(userId);
  }

  @Post(':userId/genre/:genreId')
  addGenreIdToUserByUserId(
    @Param() params: { userId: number; genreId: number },
  ): Promise<void> {
    return this.userFavoriteGenreService.addGenreIdToUserByUserId(
      params.userId,
      params.genreId,
    );
  }

  @Delete(':userId/genre/:genreId')
  removeGenreIdToUserByUserId(
    @Param() params: { userId: number; genreId: number },
  ): Promise<void> {
    return this.userFavoriteGenreService.removeGenreIdToUserByUserId(
      params.userId,
      params.genreId,
    );
  }
}
