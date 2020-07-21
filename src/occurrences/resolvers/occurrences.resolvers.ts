import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { MyContext } from '../../common/types/myContext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { OccurrenceEntity } from '../entities/occurrence.entity';
import { OccurrencesService } from '../occurrences.service';
import { CreateOccurrenceInput } from '../types/create-occurrence.input';
import { UpdateOccurrenceInput } from '../types/update-occurrence.input';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/global.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => OccurrenceEntity)
@UseFilters(HttpExceptionFilter)
export class OccurrencesResolver extends ResolverDefault<
  OccurrenceEntity,
  CreateOccurrenceInput,
  UpdateOccurrenceInput
> {
  constructor(
    private readonly occurrencesService: OccurrencesService,
    private readonly usersService: UsersService,
  ) {
    super('Ocorrência', occurrencesService);
  }

  @Query(() => OccurrenceEntity, { name: 'occurrence' })
  async get(@Args('id') id: number): Promise<OccurrenceEntity> {
    return super.get(id);
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<OccurrenceEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceAll' })
  async getAll(): Promise<OccurrenceEntity[]> {
    return super.getAll();
  }

  @Mutation(() => OccurrenceEntity, { name: 'occurrenceCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateOccurrenceInput,
  ): Promise<OccurrenceEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [OccurrenceEntity], { name: 'occurrenceCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateOccurrenceInput] })
    input: [CreateOccurrenceInput],
  ): Promise<OccurrenceEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'occurrenceDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'occurrenceDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => OccurrenceEntity, { name: 'occurrenceUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateOccurrenceInput,
  ): Promise<OccurrenceEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'occurrenceUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateOccurrenceInput] })
    input: [UpdateOccurrenceInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
}
