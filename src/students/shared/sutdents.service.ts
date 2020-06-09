import { Injectable } from '@nestjs/common';
import { NewStudentInput } from '../inputs/new-student.input';
import { StudentArgs } from '../inputs/student.arqs';
import { Student } from '../models/sutdent.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(student: NewStudentInput, idUser: any): Promise<Student> {
    const stud = await this.studentsRepository.save({
      ...student,
      usercreated: idUser,
    });
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

  async update(
    id: number,
    student: Partial<NewStudentInput>,
    idUser: any,
  ): Promise<Student> {
    await this.studentsRepository.update(id, {
      ...student,
      userupdated: idUser,
    });
    return this.findOneById(id);
  }
}
