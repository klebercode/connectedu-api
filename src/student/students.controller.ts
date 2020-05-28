import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { StudentsService } from "./shared/students.service";
import { Student } from "./shared/student";

@Controller('students')
export class StudentsController {
    constructor(
         private studentsService: StudentsService,
    ){}

    @Get()
    async getAll(): Promise<Student[]>{
        return this.studentsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) : Promise<Student>{
        return this.studentsService.getById (id);
    }

    @Post()
    async create(@Body() student: Student) : Promise<Student>{
        return this.studentsService.create(student);
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body() student: Student) : Promise<Student>{
        return this.studentsService.update(id,student);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) : Promise<void>{
        return this.studentsService.remove(id);
    }

}
