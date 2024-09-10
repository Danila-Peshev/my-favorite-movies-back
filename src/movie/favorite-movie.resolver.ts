import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { MovieService } from './favorite-movie.service';
import { FavoriteMovie } from './favorite-movie.entity';

@Resolver('Movie')
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [FavoriteMovie])
  async getUserMovies(@Args('userId', { type: () => Int }) userId: number) {
    return await this.movieService.findUserMovies(userId);
  }

  @Mutation(() => FavoriteMovie)
  async addUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.addUserMovie(userId, movieId);
  }

  @Mutation(() => GraphQLString)
  async removeUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.removeUserMovie(userId, movieId);
  }

  @Mutation(() => FavoriteMovie)
  async toggleUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.movieService.toggleUserMovie(userId, movieId);
  }
}
