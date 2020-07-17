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
import { MyContext } from '../../common/types/myContext';

import { CreatStudentInformationInput } from '../types/create-studentinformation.input';
import { StudentInformationEntity } from '../entities/studentinformation.entity';
import { StudentInformationsService } from '../studentinformations.service';

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

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentInformationEntity)
@UseFilters(HttpExceptionFilter)
export class StudentInformationsResolver {
  constructor(
    private readonly studentInformationsService: StudentInformationsService,
    private readonly usersService: UsersService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly studentsService: StudentsService,
    private readonly yearsService: YearsService,
    private readonly classRoomsService: ClassRoomsService,
  ) {}
  private nameApp = 'Informações do Estudante';

  @Query(() => StudentInformationEntity, { name: 'studentInformation' })
  async getStudentInformation(
    @Args('id') id: number,
  ): Promise<StudentInformationEntity> {
    try {
      const obj = await this.studentInformationsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [StudentInformationEntity], { name: 'studentInformationAll' })
  async getStudentInformations(): Promise<StudentInformationEntity[]> {
    try {
      return this.studentInformationsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => StudentInformationEntity, {
    name: 'studentInformationCreate',
  })
  async createStudentInformation(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentInformationInput,
  ): Promise<StudentInformationEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentInformationsService.create(
        input,
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'studentInformationDelete' })
  async deleteStudentInformation(@Args('id') id: number): Promise<boolean> {
    try {
      await this.studentInformationsService.remove(id);
      const obj = await this.studentInformationsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => StudentInformationEntity, {
    name: 'studentInformationUpdate',
  })
  async updateStudentInformation(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatStudentInformationInput,
  ): Promise<StudentInformationEntity> {
    try {
      const { user } = context.req;
      const obj = await this.studentInformationsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
}
