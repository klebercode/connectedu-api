import { UseGuards, HttpException } from '@nestjs/common';
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

import { TeacherEntity } from '../entities/teacher.entity';
import { TeachersService } from '../teachers.service';
import { CreateTeacherInput } from '../types/create-teacher.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => TeacherEntity)
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  @Query(() => TeacherEntity, { name: 'teacher' })
  async getTeacher(@Args('id') id: number): Promise<TeacherEntity> {
    return await this.teachersService.findOneById(id);
  }

  @Query(() => [TeacherEntity], { name: 'teacherAll' })
  async getTeachers(): Promise<TeacherEntity[]> {
    return await this.teachersService.findAll();
  }

  @Mutation(() => TeacherEntity, { name: 'teacherCreate' })
  async createTeacher(
    @Context() context: MyContext,
    @Args('input') input: CreateTeacherInput,
  ): Promise<TeacherEntity> {
    try {
      const { user } = context.req;
      const teacher = await this.teachersService.create(input, user['id']);

      return teacher;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => TeacherEntity, { name: 'teacherUpdate' })
  async updateTeacher(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateTeacherInput,
  ): Promise<TeacherEntity> {
    try {
      const { user } = context.req;
      const teacher = await this.teachersService.update(
        id,
        { ...input },
        user['id'],
      );

      return teacher;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'teacherDelete' })
  async deteleTeacher(@Args('id') id: number): Promise<boolean> {
    await this.teachersService.remove(id);
    const teacher = await this.teachersService.findOneById(id);
    if (!teacher) {
      return true;
    }
    return false;
  }

  @ResolveField('state')
  async state(@Parent() teacher: TeacherEntity) {
    const id = teacher.stateId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('city')
  async city(@Parent() teacher: TeacherEntity) {
    const id = teacher.cityId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() teacher: TeacherEntity): Promise<any> {
    const id = teacher.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() teacher: TeacherEntity) {
    const id = teacher.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
