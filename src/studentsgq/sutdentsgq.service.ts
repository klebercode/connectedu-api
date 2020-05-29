import { Injectable } from '@nestjs/common';
import { NewStudentInput } from './dto/new-student.input';
import { StudentArgs } from './dto/student.arqs';
import { Student } from './models/sutdent.model';

@Injectable()
export class StudentsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewStudentInput): Promise<Student> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Student> {
    return {} as any;
  }

  async findAll(studentArgs: StudentArgs): Promise<Student[]> {
    return [] as Student[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
