import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { MovieService } from './favorite-movie.service';
import { FavoriteMovie } from './favorite-movie.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver('Movie')
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [FavoriteMovie])
  async getUserMovies(@Args('userId', { type: () => Int }) userId: number) {
    return await this.movieService.findUserMovies(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MutationResult)
  async toggleUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.toggleUserMovie(userId, movieId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FavoriteMovie)
  async toggleWatchMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.toggleWatchMovie(userId, movieId);
  }
}
