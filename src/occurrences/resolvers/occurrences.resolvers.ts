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

import {
  OccurrenceEntity,
  OccurrencePaginated,
} from '../entities/occurrence.entity';
import { OccurrencesService } from '../occurrences.service';
import { CreateOccurrenceInput } from '../types/create-occurrence.input';
import { UpdateOccurrenceInput } from '../types/update-occurrence.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => OccurrenceEntity)
@UseFilters(HttpExceptionFilter)
export class OccurrencesResolver extends ResolverDefault<
  OccurrenceEntity,
  CreateOccurrenceInput,
  UpdateOccurrenceInput
> {
  constructor(private readonly occurrencesService: OccurrencesService) {
    super('Ocorrência', occurrencesService);
  }

  @Query(() => OccurrenceEntity, { name: 'occurrence' })
  async get(@Args('id') id: number): Promise<OccurrenceEntity> {
    return super.get(id);
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceAll' })
  async getAll(): Promise<OccurrenceEntity[]> {
    return super.getAll();
  }

  @Query(() => OccurrencePaginated, { name: 'occurrencePages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<OccurrencePaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<OccurrenceEntity[]> {
    return super.getMany(ids);
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
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'occurrenceDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
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
}
