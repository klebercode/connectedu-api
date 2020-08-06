import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeyAccessService } from './keyaccess.service';
import { KeyAccessResolver } from './resolvers/keyaccess.resolver';
import { KeyAccessEntity } from './entities/keyaccess.object';
import { KeyAccessFirstResolver } from './resolvers/keyaccessfirst.resolver';

import { AuthModule } from '../auth/auth.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { CustomersModule } from '../customers/customers.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';
import { EmployeesModule } from '../employees/employees.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';
import { UsersModule } from '../users/users.module';
import { UserCentesModule } from '../usercenter/usercenters.module';

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
    UserCentesModule,
    TypeOrmModule.forFeature([KeyAccessEntity]),
  ],
  providers: [
    KeyAccessResolver,
    KeyAccessFirstResolver,
    KeyAccessService,
    DateScalar,
  ],
  exports: [KeyAccessService],
})
export class KeyAccessModule {}
