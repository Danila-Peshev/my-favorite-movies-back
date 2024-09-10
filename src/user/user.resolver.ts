import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { FavoriteGenre, FavoriteMovie, User } from './user.entity';
import { GraphQLString } from 'graphql';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [FavoriteGenre])
  async getUserGenres(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return (await this.userService.findUserGenres(userId)) || [];
  }

  @Query(() => [FavoriteMovie])
  async getUserMovies(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.userService.findUserMovies(userId);
  }

  @Mutation(() => FavoriteGenre)
  async addUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.userService.addUserGenre(userId, genreId);
  }

  @Mutation(() => GraphQLString)
  async removeUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.userService.removeUserGenre(userId, genreId);
  }

  @Mutation(() => FavoriteMovie)
  async addUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.addUserMovie(userId, movieId);
  }

  @Mutation(() => GraphQLString)
  async removeUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.removeUserMovie(userId, movieId);
  }

  @Mutation(() => FavoriteMovie)
  async toggleUserMovie(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('movieId', { type: () => Int }) movieId: number,
  ) {
    return await this.userService.toggleUserMovie(userId, movieId);
  }

}
