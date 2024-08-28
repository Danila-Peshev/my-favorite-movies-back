import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserFavoriteMovieService } from './userFavoriteMovie.service';

@Controller('user')
export class UserFavoriteMovieController {
  constructor(private userFavoriteMovieService: UserFavoriteMovieService) {}

  @Get(':userId/movies')
  getAllMoviesIdsByUserId(@Param('userId') userId: number): Promise<number[]> {
    return this.userFavoriteMovieService.getAllMoviesIdsByUserId(userId);
  }

  @Post(':userId/movie/:movieId')
  addMovieIdToUserByUserId(
    @Param() params: { userId: number; movieId: number },
  ): Promise<void> {
    return this.userFavoriteMovieService.addMovieIdToUserByUserId(
      params.userId,
      params.movieId,
    );
  }

  @Delete(':userId/movie/:movieId')
  removeMovieIdToUserByUserId(
    @Param() params: { userId: number; movieId: number },
  ): Promise<void> {
    return this.userFavoriteMovieService.removeMovieIdToUserByUserId(
      params.userId,
      params.movieId,
    );
  }
}
