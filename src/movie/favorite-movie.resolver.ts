import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './favorite-movie.service';
import { FavoriteMovie } from './favorite-movie.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserDecorator } from 'src/user/user.decorator';
import { RequestUser } from 'src/user/gql-classes/RequestUser';

@Resolver('Movie')
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [FavoriteMovie])
  async getUserMovies(@UserDecorator() user: RequestUser) {
    return await this.movieService.findUserMovies(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MutationResult)
  async toggleUserMovie(
    @UserDecorator() user: RequestUser,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.toggleUserMovie(user.id, movieId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FavoriteMovie)
  async toggleWatchMovie(
    @UserDecorator() user: RequestUser,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.toggleWatchMovie(user.id, movieId);
  }
}
