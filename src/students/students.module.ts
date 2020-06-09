import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentResolver } from './resolvers/students.resolver';
import { StudentsService } from './shared/sutdents.service';
import { Student } from './models/student.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), UsersModule],
  providers: [StudentResolver, StudentsService, DateScalar],
})
export class StudentsgqModule {}
