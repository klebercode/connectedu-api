import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { StudentResolver } from './students.resolver';
import { StudentsService } from './sutdents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './schemas/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentsService, DateScalar],
})
export class StudentsgqModule {}
