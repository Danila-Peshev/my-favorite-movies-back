import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './favorite-genre.service';
import { FavoriteGenre } from './favorite-genre.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver('Genre')
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [FavoriteGenre])
  async getUserGenres(@Args('userId', { type: () => Int }) userId: number) {
    return (await this.genreService.findUserGenres(userId)) || [];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MutationResult)
  async toggleUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.genreService.toggleUserGenre(userId, genreId);
  }
}
