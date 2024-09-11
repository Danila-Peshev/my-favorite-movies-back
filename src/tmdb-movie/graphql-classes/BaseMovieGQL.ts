import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseMovieGQL {
  @Field((type) => Int)
  id: number;
  @Field()
  backdropPath: string;
  @Field((type) => [Int])
  genreIds: number[];
  @Field()
  overview: string;
  @Field((type) => Float)
  popularity: number;
  @Field()
  posterPath: string;
  @Field()
  releaseDate: string;
  @Field()
  title: string;
  @Field((type) => Float)
  voteAverage: number;
  @Field((type) => Int)
  voteCount: number;
}
