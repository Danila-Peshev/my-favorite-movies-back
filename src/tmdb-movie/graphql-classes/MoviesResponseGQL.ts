import { BaseMovieGQL } from './BaseMovieGQL';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MoviesResponseGQL {
  @Field((type) => Int)
  page: number;
  @Field((type) => [BaseMovieGQL])
  results: BaseMovieGQL[];
  @Field((type) => Int)
  totalPages: number;
  @Field((type) => Int)
  totalResult: number;
}
