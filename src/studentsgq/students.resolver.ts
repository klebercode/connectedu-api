import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewStudentInput } from './dto/new-student.input';
import { StudentArgs } from './dto/student.arqs';
import { Student } from './models/sutdent.model';
import { StudentsService } from './sutdentsgq.service';

const pubSub = new PubSub();

@Resolver(of => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentsService) {}

  @Query(returns => Student)
  async student(@Args('id') id: string): Promise<Student> {
    const student = await this.studentService.findOneById(id);
    if (!student) {
      throw new NotFoundException(id);
    }
    return student;
  }

  @Query(returns => [Student])
  students(@Args() studentsArgs: StudentArgs): Promise<Student[]> {
    return this.studentService.findAll(studentsArgs);
  }

  @Mutation(returns => Student)
  async addStudent(
    @Args('newStudentData') newStudentData: NewStudentInput,
  ): Promise<Student> {
    const recipe = await this.studentService.create(newStudentData);
    pubSub.publish('studentAdded', { studentAdded: recipe });
    return recipe;
  }

  @Mutation(returns => Boolean)
  async removeStudent(@Args('id') id: string) {
    return this.studentService.remove(id);
  }

  @Subscription(returns => Student)
  studentAdded() {
    return pubSub.asyncIterator('studentAdded');
  }
}
