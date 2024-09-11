import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Genre } from './types/Genre';
import { Language } from './types/Language';
import { GraphQLString } from 'graphql';
import { GenreGQL } from './graphql-classes/GenreGQL';
import { MoviesResponse } from './types/MoviesResponse';
import { MoviesResponseGQL } from './graphql-classes/MoviesResponseGQL';
import { BaseMovieGQL } from './graphql-classes/BaseMovieGQL';
import { BaseMovie } from './types/BaseMovie';
import { GetMoviesArgs } from './args-types/GetMoviesArgs';
import { GetFavoriteMoviesArgs } from './args-types/GetFavoriteMoviesArgs';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private moviesService: MoviesService) {}

  @Query(() => [GenreGQL])
  async getAllGenres(
    @Args('language', { type: () => GraphQLString, nullable: true })
    language?: Language,
  ): Promise<Genre[]> {
    return await this.moviesService.getAllGenres({ language });
  }

  @Query(() => MoviesResponseGQL)
  async getMoviesByFilters(
    @Args() args: GetMoviesArgs,
  ): Promise<MoviesResponse> {
    return await this.moviesService.getMoviesByFilters({
      language: args.language,
      genreIds: args.genreIds,
      minCountVotes: args.minCountVotes,
      releaseYear: args.releaseYear,
      page: args.page,
    });
  }

  @Query(() => MoviesResponseGQL)
  async getFavoriteMoviesByIds(
    @Args() args: GetFavoriteMoviesArgs,
  ): Promise<MoviesResponse> {
    return await this.moviesService.getFavoriteMoviesByIds({
      ids: args.ids,
      language: args.language,
      page: args.page,
    });
  }

  @Query(() => BaseMovieGQL)
  async getMovieById(
    @Args('id', { type: () => Int }) id: number,
    @Args('language', { type: () => GraphQLString, nullable: true })
    language?: Language,
  ): Promise<BaseMovie> {
    return await this.moviesService.getMovieById({
      id,
      language,
    });
  }
}
