import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeyAcessService } from './keyacess.service';
import { KeyAcessResolver } from './resolvers/keyacess.resolver';
import { KeyAcessEntity } from './entities/keyacess.object';
import { KeyAcessFirstResolver } from './resolvers/keyacessfirst.resolver';

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
    TypeOrmModule.forFeature([KeyAcessEntity]),
  ],
  providers: [
    KeyAcessResolver,
    KeyAcessFirstResolver,
    KeyAcessService,
    DateScalar,
  ],
  exports: [KeyAcessService],
})
export class KeyAcessModule {}
