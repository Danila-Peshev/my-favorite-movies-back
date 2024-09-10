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
    @Args('language', { type: () => GraphQLString, nullable: true })
    language?: Language,
    @Args('genreIds', { type: () => [Int], nullable: true })
    genreIds?: number[],
    @Args('minCountVotes', { type: () => Int, nullable: true })
    minCountVotes?: number,
    @Args('releaseYear', { type: () => Int, nullable: true })
    releaseYear?: number,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
  ): Promise<MoviesResponse> {
    return await this.moviesService.getMoviesByFilters({
      language,
      genreIds,
      minCountVotes,
      releaseYear,
      page,
    });
  }

  @Query(() => MoviesResponseGQL)
  async getFavoriteMoviesByIds(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Args('language', { type: () => GraphQLString, nullable: true })
    language?: Language,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
  ): Promise<MoviesResponse> {
    return await this.moviesService.getFavoriteMoviesByIds({
      ids,
      language,
      page,
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
