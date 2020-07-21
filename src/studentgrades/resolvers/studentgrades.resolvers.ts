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

import { StudentGradeEntity } from '../entities/studentgrade.entity';
import { StudentGradesService } from '../studentgrades.service';
import { CreatStudentGradeInput } from '../types/create-studentgrade.input';
import { UpdateStudentGradeInput } from '../types/update-studentgrade.input';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { StudentsService } from '../../students/students.service';
import { YearsService } from '../../years/years.service';
import { SubjectsService } from '../../subjects/subjects.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/global.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentGradeEntity)
@UseFilters(HttpExceptionFilter)
export class StudentGradesResolver extends ResolverDefault<
  StudentGradeEntity,
  CreatStudentGradeInput,
  UpdateStudentGradeInput
> {
  constructor(
    private readonly studentGradesService: StudentGradesService,
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
  ) {
    super('Notas Estudante', studentGradesService);
  }

  @Query(() => StudentGradeEntity, { name: 'studentGrade' })
  async get(@Args('id') id: number): Promise<StudentGradeEntity> {
    return super.get(id);
  }

  @Query(() => [StudentGradeEntity], { name: 'studentGradeMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentGradeEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [StudentGradeEntity], { name: 'studentGradeAll' })
  async getAll(): Promise<StudentGradeEntity[]> {
    return super.getAll();
  }

  @Mutation(() => StudentGradeEntity, {
    name: 'studentGradeCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentGradeInput,
  ): Promise<StudentGradeEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StudentGradeEntity], { name: 'studentGradeCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatStudentGradeInput] })
    input: [CreatStudentGradeInput],
  ): Promise<StudentGradeEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'studentGradeDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'studentGradeDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => StudentGradeEntity, {
    name: 'studentGradeUpdate',
  })
  async updateStudentGrade(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStudentGradeInput,
  ): Promise<StudentGradeEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'studentGradeUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStudentGradeInput] })
    input: [UpdateStudentGradeInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('student')
  async student(
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.studentId;
    if (!id) {
      return null;
    }
    try {
      return this.studentsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField('year')
  async year(@Parent() studentGradeEntity: StudentGradeEntity): Promise<any> {
    const id = studentGradeEntity.yearId;
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
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.subjectId;
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
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.userCreatedId;
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
  async userUpdated(@Parent() studentGradeEntity: StudentGradeEntity) {
    const id = studentGradeEntity.userUpdatedId;
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
