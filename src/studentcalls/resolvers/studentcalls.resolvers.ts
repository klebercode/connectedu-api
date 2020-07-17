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

import { CreatStudentCallInput } from '../types/create-studentcall.input';
import { StudentCallEntity } from '../entities/studentcall.entity';
import { StudentCallsService } from '../studentcalls.service';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { StudentsService } from '../../students/students.service';
import { SubjectsService } from '../../subjects/subjects.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentCallEntity)
@UseFilters(HttpExceptionFilter)
export class StudentCallsResolver {
  constructor(
    private readonly studentCallsService: StudentCallsService,
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly subjectsService: SubjectsService,
  ) {}
  private nameApp = 'Chamada Estudantes';

  @Query(() => StudentCallEntity, { name: 'studentCall' })
  async getStudentCall(@Args('id') id: number): Promise<StudentCallEntity> {
    try {
      const obj = await this.studentCallsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [StudentCallEntity], { name: 'studentCallAll' })
  async getStudentCalls(): Promise<StudentCallEntity[]> {
    try {
      return this.studentCallsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => StudentCallEntity, {
    name: 'studentCallCreate',
  })
  async createStudentCall(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentCallInput,
  ): Promise<StudentCallEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentCallsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'studentCallDelete' })
  async deleteStudentCall(@Args('id') id: number): Promise<boolean> {
    try {
      await this.studentCallsService.remove(id);
      const obj = await this.studentCallsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => StudentCallEntity, {
    name: 'studentCallUpdate',
  })
  async updateStudentCall(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatStudentCallInput,
  ): Promise<StudentCallEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentCallsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  @ResolveField('student')
  async student(@Parent() StudentCallEntity: StudentCallEntity): Promise<any> {
    const id = StudentCallEntity.studentId;
    if (!id) {
      return null;
    }
    try {
      return this.studentsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField('subject')
  async subject(@Parent() studentCallEntity: StudentCallEntity): Promise<any> {
    const id = studentCallEntity.subjectId;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() studentCallEntity: StudentCallEntity,
  ): Promise<any> {
    const id = studentCallEntity.userCreatedId;
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
  async userUpdated(@Parent() studentCallEntity: StudentCallEntity) {
    const id = studentCallEntity.userUpdatedId;
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
