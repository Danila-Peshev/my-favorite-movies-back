import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './favorite-genre.service';
import { FavoriteGenre } from './favorite-genre.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';

@Resolver('Genre')
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Query(() => [FavoriteGenre])
  async getUserGenres(@Args('userId', { type: () => Int }) userId: number) {
    return (await this.genreService.findUserGenres(userId)) || [];
  }

  @Mutation(() => MutationResult)
  async toggleUserGenre(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.genreService.toggleUserGenre(userId, genreId);
  }
}
