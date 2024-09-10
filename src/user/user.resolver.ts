import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { FavoriteGenre, FavoriteMovie, User } from './user.entity';
import { GraphQLString } from 'graphql';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [FavoriteGenre])
  async getAllGenresByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return (await this.userService.findAllGenresByUserId(userId)) || [];
  }

  @Query(() => [FavoriteMovie])
  async getAllMoviesByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.userService.findAllMoviesByUserId(userId);
  }

  @Mutation(() => FavoriteGenre)
  async addGenreIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.userService.addGenreIdToUserByUserId(userId, genreId);
  }

  @Mutation(() => GraphQLString)
  async removeGenreIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.userService.removeGenreIdToUserByUserId(userId, genreId);
  }

  @Mutation(() => FavoriteMovie)
  async addMovieIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.addMovieIdToUserByUserId(userId, movieId);
  }

  @Mutation(() => GraphQLString)
  async removeMovieIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.removeMovieIdToUserByUserId(userId, movieId);
  }

  @Mutation(() => FavoriteMovie)
  async watchByMovieIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.watchByMovieIdToUserByUserId(userId, movieId);
  }

  @Mutation(() => FavoriteMovie)
  async unWatchByMovieIdToUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.unWatchByMovieIdToUserByUserId(
      userId,
      movieId,
    );
  }
}
