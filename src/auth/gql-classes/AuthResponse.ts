import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field((type) => String)
  token: string;
}
