import { NotFoundException, UseGuards } from '@nestjs/common';
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
import { GqlAuthGuard } from '../../auth/shared/jwt-authgq.gaurd';

import { NewStudentInput } from '../inputs/new-student.input';
import { StudentArgs } from '../inputs/student.arqs';
import { Student } from '../models/sutdent.model';
import { StudentsService } from '../shared/sutdents.service';
import { MyContext } from '../../common/types/myContext';
import { UsersService } from '../../users/shared/users.service';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => Student)
  async studentId(@Args('id') id: number): Promise<Student> {
    const student = await this.studentService.findOneById(id);
    if (!student) {
      throw new NotFoundException(id);
    }
    return student;
  }

  @Query(returns => [Student])
  studentAll(@Args() studentsArgs: StudentArgs): Promise<Student[]> {
    return this.studentService.findAll(studentsArgs);
  }

  @Mutation(returns => Student)
  async studentCreate(
    @Context() context: MyContext,
    @Args('newData') newData: NewStudentInput,
  ): Promise<Student> {
    const { user } = context.req;
    const student = await this.studentService.create(newData, user['id']);
    pubSub.publish('studentAdded', { studentAdded: student });
    return student;
  }

  @Mutation(returns => Student)
  async studentUpdate(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('updateData') updateData: NewStudentInput,
  ): Promise<Student> {
    const { user } = context.req;
    const student = await this.studentService.update(
      id,
      { ...updateData },
      user['id'],
    );
    pubSub.publish('updateData', { studentAdded: student });
    return student;
  }

  @Mutation(returns => Boolean)
  async studentRemove(@Args('id') id: number): Promise<Boolean> {
    await this.studentService.remove(id);
    const student = await this.studentService.findOneById(id);
    if (!student) {
      return true;
    }
    return false;
  }

  @Subscription(returns => Student)
  studentAdded() {
    return pubSub.asyncIterator('newData');
  }

  @ResolveField('usercreated')
  async usercreated(@Parent() student: Student) {
    const id = student.usercreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userupdated')
  async userupdated(@Parent() student: Student) {
    const id = student.userupdatedId;
    return this.usersService.findOneById(id);
  }
}
