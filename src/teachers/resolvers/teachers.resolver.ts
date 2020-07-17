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

import { TeacherEntity } from '../entities/teacher.entity';
import { TeachersService } from '../teachers.service';
import { CreateTeacherInput } from '../types/create-teacher.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => TeacherEntity)
@UseFilters(HttpExceptionFilter)
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}
  private nameApp = 'Professor';

  @Query(() => TeacherEntity, { name: 'teacher' })
  async getTeacher(@Args('id') id: number): Promise<TeacherEntity> {
    try {
      const obj = await this.teachersService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [TeacherEntity], { name: 'teacherAll' })
  async getTeachers(): Promise<TeacherEntity[]> {
    try {
      return this.teachersService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'teacherDelete' })
  async deteleTeacher(@Args('id') id: number): Promise<boolean> {
    try {
      await this.teachersService.remove(id);
      const teacher = await this.teachersService.findOneById(id);
      if (!teacher) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
}
