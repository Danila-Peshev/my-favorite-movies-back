import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestUser {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  email: string;
}
