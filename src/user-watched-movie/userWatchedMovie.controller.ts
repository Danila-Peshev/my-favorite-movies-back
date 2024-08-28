import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserWatchedMovieService } from "./userWatchedMovie.service";

@Controller("user")
export class UserWatchedMovieController {
  constructor(private userWatchedMovieService: UserWatchedMovieService) {}

  @Get(":userId/watched-movies")
  getAllWatchedMoviesIdsByUserId(@Param("userId") userId: number): Promise<number[]> {
    return this.userWatchedMovieService.getAllWatchedMoviesIdsByUserId(userId)
  }

  @Post(":userId/watched-movie/:movieId")
  addWatchedMovieIdToUserByUserId(@Param() params: {userId: number, movieId: number}): Promise<void> {
    return this.userWatchedMovieService.addWatchedMovieIdToUserByUserId(params.userId, params.movieId);
  }

  @Delete(":userId/watched-movie/:movieId")
  removeWatchedMovieIdToUserByUserId(@Param() params: {userId: number, movieId: number}): Promise<void> {
    return this.userWatchedMovieService.removeWatchedMovieIdToUserByUserId(params.userId, params.movieId);
  }

}