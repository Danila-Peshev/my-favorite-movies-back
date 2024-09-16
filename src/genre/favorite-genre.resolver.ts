import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './favorite-genre.service';
import { FavoriteGenre } from './favorite-genre.entity';
import { MutationResult } from 'src/mutation-response-classes/MutationResult';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserDecorator } from 'src/user/user.decorator';
import { RequestUser } from 'src/user/gql-classes/RequestUser';

@Resolver('Genre')
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [FavoriteGenre])
  async getUserGenres(@UserDecorator() user: RequestUser) {
    return (await this.genreService.findUserGenres(user.id)) || [];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MutationResult)
  async toggleUserGenre(
    @UserDecorator() user: RequestUser,
    @Args('genreId', { type: () => Int }) genreId: number,
  ) {
    return await this.genreService.toggleUserGenre(user.id, genreId);
  }
}
