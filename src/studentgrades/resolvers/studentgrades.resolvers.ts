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

import { CreatStudentGradeInput } from '../types/create-studentgrade.input';
import { StudentGradeEntity } from '../entities/studentgrade.entity';
import { StudentGradesService } from '../studentgrades.service';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { StudentsService } from '../../students/students.service';
import { YearsService } from '../../years/years.service';
import { SubjectsService } from '../../subjects/subjects.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentGradeEntity)
export class StudentGradesResolver {
  constructor(
    private readonly studentGradesService: StudentGradesService,
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Query(() => StudentGradeEntity, { name: 'studentGrade' })
  async getStudentGrade(@Args('id') id: number): Promise<StudentGradeEntity> {
    return await this.studentGradesService.findOneById(id);
  }

  @Query(() => [StudentGradeEntity], { name: 'studentGradeAll' })
  async getStudentGrades(): Promise<StudentGradeEntity[]> {
    return this.studentGradesService.findAll();
  }

  @Mutation(() => StudentGradeEntity, {
    name: 'studentGradeCreate',
  })
  async createStudentGrade(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentGradeInput,
  ): Promise<StudentGradeEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentGradesService.create(input, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'studentGradeDelete' })
  async deleteStudentGrade(@Args('id') id: number): Promise<boolean> {
    await this.studentGradesService.remove(id);
    const obj = await this.studentGradesService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => StudentGradeEntity, {
    name: 'studentGradeUpdate',
  })
  async updateStudentGrade(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatStudentGradeInput,
  ): Promise<StudentGradeEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentGradesService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('student')
  async student(
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.studentId;
    if (!id) {
      return null;
    }
    return this.studentsService.findOneById(id);
  }

  @ResolveField('year')
  async year(@Parent() studentGradeEntity: StudentGradeEntity): Promise<any> {
    const id = studentGradeEntity.yearId;
    if (!id) {
      return null;
    }
    return this.yearsService.findOneById(id);
  }

  @ResolveField('subject')
  async subject(
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.subjectId;
    if (!id) {
      return null;
    }
    return this.subjectsService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() studentGradeEntity: StudentGradeEntity,
  ): Promise<any> {
    const id = studentGradeEntity.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() studentGradeEntity: StudentGradeEntity) {
    const id = studentGradeEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
