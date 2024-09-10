import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenreGQL {
  @Field((type) => Int)
  id: number;
  @Field()
  name: string;
}
