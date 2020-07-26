import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';

/**
 * Based on https://docs.nestjs.com/graphql/resolvers#generics
 *
 * @param classRef
 */
export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field(type => String)
    cursor: string;

    @Field(type => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(type => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(type => PageInfo, { nullable: true })
    pageInfo: PageInfo;
  }
  return PaginatedType;
}
