import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserTokensService } from './usertokens.service';
import { UserTokensResolver } from './resolvers/usertokens.resolver';
import { UserTokenEntity } from './entities/usertokens.object';

import { AuthModule } from '../auth/auth.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { CustomersModule } from '../customers/customers.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';
import { EmployeesModule } from '../employees/employees.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    CustomersModule,
    OrganizationsModule,
    StudentsModule,
    TeachersModule,
    EmployeesModule,
    ResponsiblesModule,
    UsersModule,
    TypeOrmModule.forFeature([UserTokenEntity]),
  ],
  providers: [UserTokensResolver, UserTokensService, DateScalar],
  exports: [UserTokensService],
})
export class UserTokensModule {}
