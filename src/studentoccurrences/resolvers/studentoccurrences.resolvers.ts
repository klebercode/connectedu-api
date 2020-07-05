import { UseGuards, HttpException } from '@nestjs/common';
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

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentOccurrenceEntity)
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

  @Query(() => StudentOccurrenceEntity, { name: 'studentOccurrence' })
  async getStudentOccurrence(
    @Args('id') id: number,
  ): Promise<StudentOccurrenceEntity> {
    return await this.studentOccurrencesService.findOneById(id);
  }

  @Query(() => [StudentOccurrenceEntity], { name: 'studentOccurrenceAll' })
  async getStudentOccurrences(): Promise<StudentOccurrenceEntity[]> {
    return this.studentOccurrencesService.findAll();
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'studentOccurrenceDelete' })
  async deleteStudentOccurrence(@Args('id') id: number): Promise<boolean> {
    await this.studentOccurrencesService.remove(id);
    const obj = await this.studentOccurrencesService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
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
    return this.occurrencesService.findOneById(id);
  }

  @ResolveField('student')
  async student(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.studentId;
    if (!id) {
      return null;
    }
    return this.studentsService.findOneById(id);
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.teacherId;
    if (!id) {
      return null;
    }
    return this.teachersService.findOneById(id);
  }

  @ResolveField('subject')
  async subject(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.subjectId;
    if (!id) {
      return null;
    }
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('employee')
  async employee(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.employeeId;
    if (!id) {
      return null;
    }
    return this.employeesService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ): Promise<any> {
    const id = studentOccurrenceEntity.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userUpdated(
    @Parent() studentOccurrenceEntity: StudentOccurrenceEntity,
  ) {
    const id = studentOccurrenceEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
