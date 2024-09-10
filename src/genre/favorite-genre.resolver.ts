import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { GenreService } from './favorite-genre.service';
import { FavoriteGenre } from './favorite-genre.entity';

@Resolver('Genre')
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Query(() => [FavoriteGenre])
  async getUserGenres(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return (await this.genreService.findUserGenres(userId)) || [];
  }

  @Mutation(() => FavoriteGenre)
  async addUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.genreService.addUserGenre(userId, genreId);
  }

  @Mutation(() => GraphQLString)
  async removeUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.genreService.removeUserGenre(userId, genreId);
  }

}
