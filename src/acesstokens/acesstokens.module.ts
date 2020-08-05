import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcessTokensService } from './acesstokens.service';
import { AcessTokensResolver } from './resolvers/acesstokens.resolver';
import { AcessTokenEntity } from './entities/acesstokens.object';
import { AcessFirstResolver } from './resolvers/acessfirst.resolver';

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
    TypeOrmModule.forFeature([AcessTokenEntity]),
  ],
  providers: [
    AcessTokensResolver,
    AcessFirstResolver,
    AcessTokensService,
    DateScalar,
  ],
  exports: [AcessTokensService],
})
export class AcessTokensModule {}
