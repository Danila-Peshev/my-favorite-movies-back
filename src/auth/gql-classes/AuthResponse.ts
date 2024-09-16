import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field((type) => String)
  token: string;
  @Field((type) => Int)
  userId: number;
  @Field((type) => String)
  email: string;
}
