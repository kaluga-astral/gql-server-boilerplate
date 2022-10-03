import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindPostsArgs {
  @Field()
  authorId: number;
}
