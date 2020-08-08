import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { TeacherEntity, TeacherPaginated } from '../entities/teacher.entity';
import { TeachersService } from '../teachers.service';
import { CreateTeacherInput } from '../types/create-teacher.input';
import { UpdateTeacherInput } from '../types/update-teacher.input';

import { MyContext } from '../../common/types/mycontext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => TeacherEntity)
@UseFilters(HttpExceptionFilter)
export class TeachersResolver extends ResolverDefault<
  TeacherEntity,
  CreateTeacherInput,
  UpdateTeacherInput
> {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {
    super('Professor', teachersService);
  }

  @Query(() => TeacherEntity, { name: 'teacher' })
  async get(@Args('id') id: number): Promise<TeacherEntity> {
    return super.get(id);
  }

  @Query(() => [TeacherEntity], { name: 'teacherAll' })
  async getAll(): Promise<TeacherEntity[]> {
    return super.getAll();
  }

  @Query(() => TeacherPaginated, { name: 'teacherPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<TeacherPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [TeacherEntity], { name: 'teacherMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<TeacherEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => TeacherEntity, { name: 'teacherCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateTeacherInput,
  ): Promise<TeacherEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [TeacherEntity], { name: 'teacherCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateTeacherInput] })
    input: [CreateTeacherInput],
  ): Promise<TeacherEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'teacherDelete' })
  async detele(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'teacherDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => TeacherEntity, { name: 'teacherUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateTeacherInput,
  ): Promise<TeacherEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'teacherUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateTeacherInput] })
    input: [UpdateTeacherInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('state')
  async state(@Parent() teacher: TeacherEntity) {
    const id = teacher.stateId;
    if (!id) {
      return null;
    }

    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }

  @ResolveField('city')
  async city(@Parent() teacher: TeacherEntity) {
    const id = teacher.cityId;
    if (!id) {
      return null;
    }

    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }

  /*
  @ResolveField(() => UserEntity)
  async userCreated(@Parent() teacher: TeacherEntity): Promise<any> {
    const id = teacher.userCreatedId;
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
  async userUpdated(@Parent() teacher: TeacherEntity) {
    const id = teacher.userUpdatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
  */
}
