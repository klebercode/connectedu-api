import { UseGuards, UseFilters } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { MyContext } from '../../common/types/mycontext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { UserTypessService } from '../usertypes.service';
import { UserTypeEntity } from '../types/usertypes.object';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

//@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserTypeEntity)
@UseFilters(HttpExceptionFilter)
export class UserTypesResolver {
  constructor(private readonly UserTypessService: UserTypessService) {}
}
