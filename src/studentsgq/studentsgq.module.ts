import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { StudentResolver } from './students.resolver';
import { StudentsService } from './sutdentsgq.service';

@Module({
  providers: [StudentResolver, StudentsService, DateScalar],
})
export class StudentsgqModule {}
