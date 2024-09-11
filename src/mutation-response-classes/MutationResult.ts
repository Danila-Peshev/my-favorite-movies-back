import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MutationResult {
  @Field(type => Boolean)
  success: boolean
}