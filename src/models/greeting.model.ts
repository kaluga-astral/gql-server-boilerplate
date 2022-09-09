import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Greeting {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  greeting: string;
}
