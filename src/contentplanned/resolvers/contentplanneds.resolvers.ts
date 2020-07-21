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
import { MyContext } from '../../common/types/myContext';

import { ContentPlannedEntity } from '../entities/contentplanned.entity';
import { ContentPlannedsService } from '../contentplanneds.service';
import { CreatContentPlannedInput } from '../types/create-contentplanned.input';
import { UpdateContentPlannedInput } from '../types/update-contentplanned.input';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { YearsService } from '../../years/years.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';
import { ClassRoomsService } from '../../classrooms/classrooms.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/global.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ContentPlannedEntity)
@UseFilters(HttpExceptionFilter)
export class ContentPlannedsResolver extends ResolverDefault<
  ContentPlannedEntity,
  CreatContentPlannedInput,
  UpdateContentPlannedInput
> {
  constructor(
    private readonly contentPlannedsService: ContentPlannedsService,
    private readonly usersService: UsersService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
    private readonly classRoomsService: ClassRoomsService,
  ) {
    super('Conteúdo Planejado', contentPlannedsService);
  }

  @Query(() => ContentPlannedEntity, { name: 'contentPlanned' })
  async get(@Args('id') id: number): Promise<ContentPlannedEntity> {
    return super.get(id);
  }

  @Query(() => [ContentPlannedEntity], { name: 'contentPlannedMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ContentPlannedEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [ContentPlannedEntity], { name: 'contentPlannedAll' })
  async getAll(): Promise<ContentPlannedEntity[]> {
    return super.getAll();
  }

  @Mutation(() => ContentPlannedEntity, {
    name: 'contentPlannedCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatContentPlannedInput,
  ): Promise<ContentPlannedEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ContentPlannedEntity], { name: 'contentPlannedCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatContentPlannedInput] })
    input: [CreatContentPlannedInput],
  ): Promise<ContentPlannedEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'contentPlannedDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'contentPlannedDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ContentPlannedEntity, {
    name: 'contentPlannedUpdate',
  })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateContentPlannedInput,
  ): Promise<ContentPlannedEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'contentPlannedUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateContentPlannedInput] })
    input: [UpdateContentPlannedInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('classroom')
  async classroom(
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.classroomId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.teacherId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.yearId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.subjectId;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() contentPlannedEntity: ContentPlannedEntity) {
    const id = contentPlannedEntity.userUpdatedId;
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
