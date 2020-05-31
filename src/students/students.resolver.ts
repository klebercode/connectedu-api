import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewStudentInput } from './dto/new-student.input';
import { StudentArgs } from './dto/student.arqs';
import { Student } from './models/sutdent.model';
import { StudentsService } from './sutdents.service';

const pubSub = new PubSub();

@Resolver(of => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentsService) {}

  @Query(returns => Student)
  async student(@Args('id') id: number): Promise<Student> {
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
    const student = await this.studentService.create({ ...newStudentData });
    pubSub.publish('studentAdded', { studentAdded: student });
    return student;
  }

  @Mutation(returns => Boolean)
  async removeStudent(@Args('id') id: number) {
    await this.studentService.remove(id);
    const student = await this.studentService.findOneById(id);
    if (!student) {
      return true;
    }
    return false;
  }

  @Subscription(returns => Student)
  studentAdded() {
    return pubSub.asyncIterator('studentAdded');
  }
}
