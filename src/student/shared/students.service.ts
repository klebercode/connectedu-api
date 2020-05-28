import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student';

@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(Student)
        private studentsRepository: Repository<Student>,
    ){}

    async getAll(): Promise<Student[]>{
        return await this.studentsRepository.find();
    }

    async getById(id: number): Promise<Student>{
        return await this.studentsRepository.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.studentsRepository.delete(id);
    }

    async create(student: Student){
        //const createdStudent =  this.studentsRepository(student);
        return await this.studentsRepository.save(student);
    }

    async update(id: number, student: Student ): Promise<Student>{
        await this.studentsRepository.update(id , student);
        return this.getById(id);
    }
}
