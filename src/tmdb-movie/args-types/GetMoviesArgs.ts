import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Language } from '../types/Language';

@ArgsType()
export class GetMoviesArgs {
  @Field((type) => String, { nullable: true })
  language?: Language;

  @Field((type) => [Int], { nullable: true })
  genreIds?: number[];

  @Field((type) => Int, { nullable: true })
  minCountVotes?: number;

  @Field((type) => Int, { nullable: true })
  releaseYear?: number;

  @Field((type) => Int, { nullable: true })
  page?: number;
}
