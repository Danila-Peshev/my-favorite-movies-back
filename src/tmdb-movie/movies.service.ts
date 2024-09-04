import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Language } from './types/Language';
import { MAX_MOVIES_ON_PAGE } from './constants/movies-constants';
import { MoviesResponse } from './types/MoviesResponse';
import { Genre } from './types/Genre';
import { Movie } from './types/Movie';
import { SimpleMovie } from './types/SimpleMovie';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchFromApi(
    endpoint: string,
    params: object,
  ): Promise<Observable<any>> {
    return this.httpService
      .get(endpoint, { params })
      .pipe(map((response) => response.data));
  }

  async getAllGenres({
    language = 'ru',
  }: {
    language?: Language;
  }): Promise<Genre[]> {
    const data = await this.fetchFromApi('/genre/movie/list', { language });
    return lastValueFrom(
      data.pipe(
        map((response) => {
          return response.genres;
        }),
      ),
    );
  }

  async getMoviesByFilters({
    language = 'ru',
    genreIds = [],
    minCountVotes = 0,
    releaseYear = 0,
    page = 1,
  }: {
    language?: Language;
    genreIds?: number[];
    minCountVotes?: number;
    releaseYear?: number;
    page?: number;
  } = {}): Promise<MoviesResponse> {
    const data = await this.fetchFromApi('/discover/movie', {
      include_adult: false,
      include_video: false,
      with_genres: genreIds,
      language: language,
      page,
      sort_by: 'popularity.desc',
      'vote_count.gte': minCountVotes,
      primary_release_year: releaseYear,
    });

    return lastValueFrom(
      data.pipe(
        map((result) => {
          return {
            page: result.page,
            results: result.map(
              ({
                id,
                backdrop_path,
                genre_ids,
                overview,
                popularity,
                poster_path,
                release_date,
                title,
                vote_average,
                vote_count,
              }: Movie) => ({
                id,
                backdropPath: backdrop_path,
                genreIds: genre_ids,
                overview,
                popularity,
                posterPath: poster_path,
                releaseDate: release_date,
                title,
                voteAverage: vote_average,
                voteCount: vote_count,
              }),
            ),
            totalPages: result.total_pages,
            totalResult: result.total_results,
          };
        }),
      ),
    );
  }

  async getFavoriteMoviesByIds({
    ids,
    language = 'ru',
    page = 1,
  }: {
    ids: number[];
    language?: Language;
    page?: number;
  }): Promise<MoviesResponse> {
    const result = await Promise.all(
      ids.map((id) => this.getMovieById({ id, language })),
    );

    const totalResult = result.length;
    const totalPages = Math.ceil(totalResult / MAX_MOVIES_ON_PAGE);

    const startIndex = (page - 1) * MAX_MOVIES_ON_PAGE;
    const endIndex = startIndex + MAX_MOVIES_ON_PAGE;

    const paginatedResults = result.slice(startIndex, endIndex);

    return {
      page,
      results: paginatedResults,
      totalPages,
      totalResult,
    };
  }

  async getMovieById({
    id,
    language = 'ru',
  }: {
    id: number;
    language?: Language;
  }): Promise<SimpleMovie> {
    return lastValueFrom(
      (await this.fetchFromApi(`/movie/${id}`, { language })).pipe(
        map((result) => {
          return {
            id: result.id,
            backdropPath: result.backdrop_path,
            genreIds: result.genres.map(({ id }: { id: number }) => id),
            overview: result.overview,
            popularity: result.popularity,
            posterPath: result.poster_path,
            releaseDate: result.release_date,
            title: result.title,
            voteAverage: result.vote_average,
            voteCount: result.vote_count,
          };
        }),
      ),
    );
  }
}
