import { UseGuards, HttpException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { CreateStudentInput } from '../types/create-student.input';
import { StudentArgs } from '../types/student.args';
import { StudentEntity } from '../entities/student.entity';
import { StudentsService } from '../students.service';
import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentEntity)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly usersService: UsersService,
    private readonly stateService: StatesService,
  ) {}

  @Query(() => StudentEntity, { name: 'student' })
  async getStudent(@Args('id') id: number): Promise<StudentEntity> {
    return await this.studentsService.findOneById(id);
  }

  @Query(() => [StudentEntity], { name: 'studentAll' })
  async getStudents(
    @Args() studentsArgs: StudentArgs,
  ): Promise<StudentEntity[]> {
    return await this.studentsService.findAll(studentsArgs);
  }

  @Mutation(() => StudentEntity, { name: 'studentCreate' })
  async createStudent(
    @Context() context: MyContext,
    @Args('createData') createData: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsService.create(createData, user['id']);
      pubSub.publish('studentAdded', { studentAdded: student });

      return student;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => StudentEntity, { name: 'studentUpdate' })
  async updateStudent(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('updateData') updateData: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsService.update(
        id,
        { ...updateData },
        user['id'],
      );
      pubSub.publish('updateData', { studentAdded: student });

      return student;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'studentDelete' })
  async deteleStudent(@Args('id') id: number): Promise<boolean> {
    await this.studentsService.remove(id);
    const student = await this.studentsService.findOneById(id);
    if (!student) {
      return true;
    }
    return false;
  }

  /*@Subscription(() => StudentEntity)
  studentAdded() {
    return pubSub.asyncIterator('createData');
  }
  */

  @ResolveField('state')
  async state(@Parent() student: StudentEntity) {
    const id = student.stateId;
    if (!id) {
      return null;
    }
    return this.stateService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() student: StudentEntity): Promise<any> {
    const id = student.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() student: StudentEntity) {
    const id = student.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
