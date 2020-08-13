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

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';

import {
  ContentAppliedEntity,
  ContentAppliedPaginated,
} from '../entities/contentapplied.entity';
import { ContentAppliedsService } from '../contentapplieds.service';
import { CreatContentAppliedInput } from '../types/create-contentapplied.input';
import { UpdateContentAppliedInput } from '../types/update-contentapplied.input';

//importados

import { YearsService } from '../../years/years.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';
import { ClassRoomsService } from '../../classrooms/classrooms.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ContentAppliedEntity)
@UseFilters(HttpExceptionFilter)
export class ContentAppliedsResolver extends ResolverDefault<
  ContentAppliedEntity,
  CreatContentAppliedInput,
  UpdateContentAppliedInput
> {
  constructor(
    private readonly contentAppliedsService: ContentAppliedsService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
    private readonly classRoomsService: ClassRoomsService,
  ) {
    super('Conteúdo Vivenciado', contentAppliedsService);
  }

  @Query(() => ContentAppliedEntity, { name: 'contentApplied' })
  async get(@Args('id') id: number): Promise<ContentAppliedEntity> {
    return super.get(id);
  }

  @Query(() => [ContentAppliedEntity], { name: 'contentAppliedAll' })
  async getAll(): Promise<ContentAppliedEntity[]> {
    return super.getAll();
  }

  @Query(() => ContentAppliedPaginated, { name: 'contentAppliedPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<ContentAppliedPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [ContentAppliedEntity], { name: 'contentAppliedMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ContentAppliedEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => ContentAppliedEntity, {
    name: 'contentAppliedCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatContentAppliedInput,
  ): Promise<ContentAppliedEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ContentAppliedEntity], { name: 'contentAppliedCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatContentAppliedInput] })
    input: [CreatContentAppliedInput],
  ): Promise<ContentAppliedEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'contentAppliedDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'contentAppliedDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ContentAppliedEntity, {
    name: 'contentAppliedUpdate',
  })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateContentAppliedInput,
  ): Promise<ContentAppliedEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'contentAppliedUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateContentAppliedInput] })
    input: [UpdateContentAppliedInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('classroom')
  async classroom(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.classroomId;
    if (!id) {
      return null;
    }
    try {
      return this.classRoomsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Série');
    }
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.teacherId;
    if (!id) {
      return null;
    }
    try {
      return this.teachersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Professor');
    }
  }

  @ResolveField('year')
  async year(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.yearId;
    if (!id) {
      return null;
    }
    try {
      return this.yearsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Exercício');
    }
  }

  @ResolveField('subject')
  async subject(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.subjectId;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }
}
