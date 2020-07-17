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

import { CreatStudentOccurrenceInput } from '../types/create-studentoccurrences.input';
import { StudentOccurrenceEntity } from '../entities/studentoccurrence.entity';
import { StudentOccurrencesService } from '../studentinformations.service';

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

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentOccurrenceEntity)
@UseFilters(HttpExceptionFilter)
export class StudentOccurrencesResolver {
  constructor(
    private readonly studentOccurrencesService: StudentOccurrencesService,
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly occurrencesService: OccurrencesService,
    private readonly teachersService: TeachersService,
    private readonly subjectsService: SubjectsService,
    private readonly employeesService: EmployeesService,
  ) {}
  private nameApp = 'Ocorrência Estudante';

  @Query(() => StudentOccurrenceEntity, { name: 'studentOccurrence' })
  async getStudentOccurrence(
    @Args('id') id: number,
  ): Promise<StudentOccurrenceEntity> {
    try {
      const obj = await this.studentOccurrencesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [StudentOccurrenceEntity], { name: 'studentOccurrenceAll' })
  async getStudentOccurrences(): Promise<StudentOccurrenceEntity[]> {
    try {
      return this.studentOccurrencesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => StudentOccurrenceEntity, {
    name: 'studentOccurrenceCreate',
  })
  async createStudentOccurrence(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentOccurrenceInput,
  ): Promise<StudentOccurrenceEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentOccurrencesService.create(
        input,
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'studentOccurrenceDelete' })
  async deleteStudentOccurrence(@Args('id') id: number): Promise<boolean> {
    try {
      await this.studentOccurrencesService.remove(id);
      const obj = await this.studentOccurrencesService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => StudentOccurrenceEntity, {
    name: 'studentOccurrenceUpdate',
  })
  async updateStudentOccurrence(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatStudentOccurrenceInput,
  ): Promise<StudentOccurrenceEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentOccurrencesService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
