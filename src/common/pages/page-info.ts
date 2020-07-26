import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  countBefore: number;

  @Field({ nullable: true })
  countNext: number;

  @Field({ nullable: true })
  countCurrent: number;

  @Field({ nullable: true })
  countTotal: number;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;
}
