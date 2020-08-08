import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';

import {
  StudentInformationEntity,
  StudentInformationPaginated,
} from '../entities/studentinformation.entity';
import { StudentInformationsService } from '../studentinformations.service';
import { CreatStudentInformationInput } from '../types/create-studentinformation.input';
import { UpdateStudentInformationInput } from '../types/update-studentinformation.input';
//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { ClassRoomsService } from '../../classrooms/classrooms.service';
import { ResponsiblesService } from '../../responsibles/responsibles.service';
import { StudentsService } from '../../students/students.service';
import { YearsService } from '../../years/years.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentInformationEntity)
@UseFilters(HttpExceptionFilter)
export class StudentInformationsResolver extends ResolverDefault<
  StudentInformationEntity,
  CreatStudentInformationInput,
  UpdateStudentInformationInput
> {
  constructor(
    private readonly studentInformationsService: StudentInformationsService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly studentsService: StudentsService,
    private readonly yearsService: YearsService,
    private readonly classRoomsService: ClassRoomsService,
  ) {
    super('Informações do Estudante', studentInformationsService);
  }

  @Query(() => StudentInformationEntity, { name: 'studentInformation' })
  async get(@Args('id') id: number): Promise<StudentInformationEntity> {
    return super.get(id);
  }

  @Query(() => [StudentInformationEntity], { name: 'studentInformationAll' })
  async getAll(): Promise<StudentInformationEntity[]> {
    return super.getAll();
  }

  @Query(() => StudentInformationPaginated, { name: 'studentInformationPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<StudentInformationPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [StudentInformationEntity], { name: 'studentInformationMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentInformationEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => StudentInformationEntity, {
    name: 'studentInformationCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentInformationInput,
  ): Promise<StudentInformationEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StudentInformationEntity], {
    name: 'sstudentInformationCreateMany',
  })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatStudentInformationInput] })
    input: [CreatStudentInformationInput],
  ): Promise<StudentInformationEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'studentInformationDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'studentInformationDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => StudentInformationEntity, {
    name: 'studentInformationUpdate',
  })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStudentInformationInput,
  ): Promise<StudentInformationEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'studentInformationUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStudentInformationInput] })
    input: [UpdateStudentInformationInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('student')
  async student(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.studentId;
    if (!id) {
      return null;
    }
    try {
      return this.studentsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField('year')
  async year(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.yearId;
    if (!id) {
      return null;
    }

    try {
      return this.yearsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Exercício');
    }
  }

  @ResolveField('classroom')
  async classroom(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.classroomId;
    if (!id) {
      return null;
    }

    try {
      return this.classRoomsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Série');
    }
  }

  @ResolveField('responsible1')
  async responsible1(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.responsible1Id;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  @ResolveField('responsible2')
  async responsible2(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.responsible2Id;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  @ResolveField('responsiblePedag')
  async responsiblePedag(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.responsiblePedagId;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  /*
  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ): Promise<any> {
    const id = studentInformationEntity.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(type => UserEntity)
  async userUpdated(
    @Parent() studentInformationEntity: StudentInformationEntity,
  ) {
    const id = studentInformationEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
  */
}
