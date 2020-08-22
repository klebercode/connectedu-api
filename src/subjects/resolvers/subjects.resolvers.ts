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

import { SubjectEntity, SubjectPaginated } from '../entities/subject.entity';
import { SubjectsService } from '../subjects.service';
import { CreateSubjectInput } from '../types/create-subject.input';
import { UpdateSubjectInput } from '../types/update-subject.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => SubjectEntity)
@UseFilters(HttpExceptionFilter)
export class SubjectsResolver extends ResolverDefault<
  SubjectEntity,
  CreateSubjectInput,
  UpdateSubjectInput
> {
  constructor(private readonly subjectsService: SubjectsService) {
    super('Matéria', subjectsService);
  }

  @Query(() => SubjectEntity, { name: 'subject' })
  async get(@Args('id') id: number): Promise<SubjectEntity> {
    return super.get(id);
  }

  @Query(() => [SubjectEntity], { name: 'subjectAll' })
  async getAll(): Promise<SubjectEntity[]> {
    this.subjectsService.getTeste();
    return super.getAll();
  }

  @Query(() => SubjectPaginated, { name: 'subjectPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<SubjectPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [SubjectEntity], { name: 'subjectMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<SubjectEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => SubjectEntity, { name: 'subjectCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [SubjectEntity], { name: 'subjectCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateSubjectInput] })
    input: [CreateSubjectInput],
  ): Promise<SubjectEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'subjectDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'subjectDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => SubjectEntity, { name: 'subjectUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateSubjectInput,
  ): Promise<SubjectEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'subjectUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateSubjectInput] })
    input: [UpdateSubjectInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos
}
