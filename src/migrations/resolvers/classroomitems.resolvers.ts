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

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';

import { MigrationsService } from '../migrations.service';
import { MigrationsClassromitemsInput } from '../types/migrations-classroomitems.input';
import { MigrationsStudentInput } from '../types/migrations-students.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => MigrationsClassromitemsInput)
@UseFilters(HttpExceptionFilter)
export class MigrationsClassRoomItemsResolver {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Mutation(() => Boolean, {
    name: 'migrationsClassRoomItemMany',
  })
  async migrationsClassroomItemsMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [MigrationsClassromitemsInput] })
    input: [MigrationsClassromitemsInput],
  ): Promise<Boolean> {
    const { user } = context.req;

    return this.migrationsService.migrationsClassroomItemsMany(
      input,
      user['id'],
      user['type'],
    );
  }

  @Mutation(() => [String], {
    name: 'migrationsStundetMany',
  })
  async migrationsStundetMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [MigrationsStudentInput] })
    input: [MigrationsStudentInput],
  ): Promise<String[]> {
    const { user } = context.req;

    return this.migrationsService.migrationsStundetMany(
      input,
      user['id'],
      user['type'],
    );
  }
}
