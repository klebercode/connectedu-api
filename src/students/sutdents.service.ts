import { Injectable } from '@nestjs/common';
import { NewStudentInput } from './dto/new-student.input';
import { StudentArgs } from './dto/student.arqs';
import { Student } from './models/sutdent.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(student: NewStudentInput): Promise<Student> {
    const stud = await this.studentsRepository.save(student);
    return stud;
  }

  async findOneById(id: number): Promise<Student> {
    return await this.studentsRepository.findOne(id);
  }

  async findAll(studentArgs: StudentArgs): Promise<Student[]> {
    return await this.studentsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.studentsRepository.delete(id);
  }
}
