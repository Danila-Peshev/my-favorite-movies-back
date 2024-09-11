import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Language } from '../types/Language';

@ArgsType()
export class GetFavoriteMoviesArgs {
  @Field((type) => [Int])
  ids: number[];

  @Field((type) => String, { nullable: true })
  language?: Language;

  @Field((type) => Int, { nullable: true })
  page?: number;
}
