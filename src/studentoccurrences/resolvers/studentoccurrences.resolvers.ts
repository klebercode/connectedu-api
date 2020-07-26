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

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/myContext';

import {
  StudentOccurrenceEntity,
  StudentOccurrencePaginated,
} from '../entities/studentoccurrence.entity';
import { StudentOccurrencesService } from '../studentinformations.service';
import { CreatStudentOccurrenceInput } from '../types/create-studentoccurrences.input';
import { UpdateStudentOccurrenceInput } from '../types/update-studentoccurrences.input';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { StudentsService } from '../../students/students.service';
import { OccurrencesService } from '../../occurrences/occurrences.service';
import { TeachersService } from '../../teachers/teachers.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { EmployeesService } from '../../employees/employees.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentOccurrenceEntity)
@UseFilters(HttpExceptionFilter)
export class StudentOccurrencesResolver extends ResolverDefault<
  StudentOccurrenceEntity,
  CreatStudentOccurrenceInput,
  UpdateStudentOccurrenceInput
> {
  constructor(
    private readonly studentOccurrencesService: StudentOccurrencesService,
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly occurrencesService: OccurrencesService,
    private readonly teachersService: TeachersService,
    private readonly subjectsService: SubjectsService,
    private readonly employeesService: EmployeesService,
  ) {
    super('Ocorrência Estudante', studentOccurrencesService);
  }

  @Query(() => StudentOccurrenceEntity, { name: 'studentOccurrence' })
  async get(@Args('id') id: number): Promise<StudentOccurrenceEntity> {
    return super.get(id);
  }

  @Query(() => [StudentOccurrenceEntity], { name: 'studentOccurrenceAll' })
  async getAll(): Promise<StudentOccurrenceEntity[]> {
    return super.getAll();
  }

  @Query(() => StudentOccurrencePaginated, { name: 'studentOccurrencePages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<StudentOccurrencePaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [StudentOccurrenceEntity], { name: 'studentOccurrenceMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentOccurrenceEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => StudentOccurrenceEntity, {
    name: 'studentOccurrenceCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentOccurrenceInput,
  ): Promise<StudentOccurrenceEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StudentOccurrenceEntity], {
    name: 'studentOccurrenceCreateMany',
  })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatStudentOccurrenceInput] })
    input: [CreatStudentOccurrenceInput],
  ): Promise<StudentOccurrenceEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'studentOccurrenceDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'studentOccurrenceDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => StudentOccurrenceEntity, {
    name: 'studentOccurrenceUpdate',
  })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStudentOccurrenceInput,
  ): Promise<StudentOccurrenceEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'studentOccurrenceUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStudentOccurrenceInput] })
    input: [UpdateStudentOccurrenceInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('occurrence')
  async occurrence(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.occurrenceId;
    if (!id) {
      return null;
    }

    try {
      return this.occurrencesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Ocorrência');
    }
  }

  @ResolveField('student')
  async student(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.studentId;
    if (!id) {
      return null;
    }

    try {
      return this.studentsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.teacherId;
    if (!id) {
      return null;
    }

    try {
      return this.teachersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Professor');
    }
  }

  @ResolveField('subject')
  async subject(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.subjectId;
    if (!id) {
      return null;
    }

    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField('employee')
  async employee(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.employeeId;
    if (!id) {
      return null;
    }

    try {
      return this.employeesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Funcionário');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.userCreatedId;
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
  async userUpdated(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ) {
    const id = studentOccurrenceEntity.userUpdatedId;
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
