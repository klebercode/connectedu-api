import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './shared/students.service';
import { StudentsController } from './students.controller';
import { Student } from './schemas/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    controllers: [StudentsController],
    providers: [StudentsService],
    exports:[],
})

export class StudentsModule {}
