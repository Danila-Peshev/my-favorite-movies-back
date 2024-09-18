import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserDecorator } from 'src/user/user.decorator';
import { RequestUser } from './gql-classes/RequestUser';

@Resolver('User')
export class UserResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => RequestUser)
  async getUser(@UserDecorator() requestUser: RequestUser) {
    return requestUser;
  }
}
