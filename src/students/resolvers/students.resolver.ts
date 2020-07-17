import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { StudentEntity } from '../entities/student.entity';
import { StudentsService } from '../students.service';
import { CreateStudentInput } from '../types/create-student.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { ResponsiblesService } from '../../responsibles/responsibles.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentEntity)
@UseFilters(HttpExceptionFilter)
export class studentsResolver {
  constructor(
    private readonly studentsblesService: StudentsService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
    private readonly responsiblesService: ResponsiblesService,
  ) {}
  private nameApp = 'Estudante';

  @Query(() => StudentEntity, { name: 'student' })
  async getStudent(@Args('id') id: number): Promise<StudentEntity> {
    try {
      const obj = await this.studentsblesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [StudentEntity], { name: 'studentAll' })
  async getStudents(): Promise<StudentEntity[]> {
    try {
      return this.studentsblesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => StudentEntity, { name: 'studentCreate' })
  async createStudent(
    @Context() context: MyContext,
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsblesService.create(input, user['id']);

      return student;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'studentDelete' })
  async deteleStudent(@Args('id') id: number): Promise<boolean> {
    try {
      await this.studentsblesService.remove(id);
      const student = await this.studentsblesService.findOneById(id);
      if (!student) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => StudentEntity, { name: 'studentUpdate' })
  async updateStudent(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsblesService.update(
        id,
        { ...input },
        user['id'],
      );

      return student;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  @ResolveField('mother')
  async mother(@Parent() student: StudentEntity) {
    const id = student.motherId;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  @ResolveField('father')
  async father(@Parent() student: StudentEntity) {
    const id = student.fatherId;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  @ResolveField('resideResponsable')
  async resideResponsable(@Parent() student: StudentEntity) {
    const id = student.resideResponsableId;
    if (!id) {
      return null;
    }

    try {
      return this.responsiblesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Responsável');
    }
  }

  @ResolveField('stateNaturalness')
  async stateNaturalness(@Parent() student: StudentEntity) {
    const id = student.stateNaturalnessId;
    if (!id) {
      return null;
    }

    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }

  @ResolveField('cityNaturalness')
  async cityNaturalness(@Parent() student: StudentEntity) {
    const id = student.cityNaturalnessId;
    if (!id) {
      return null;
    }

    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }

  @ResolveField('state')
  async state(@Parent() student: StudentEntity) {
    const id = student.stateId;
    if (!id) {
      return null;
    }

    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }

  @ResolveField('city')
  async city(@Parent() student: StudentEntity) {
    const id = student.cityId;
    if (!id) {
      return null;
    }

    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(@Parent() student: StudentEntity): Promise<any> {
    const id = student.userCreatedId;
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
  async userUpdated(@Parent() student: StudentEntity) {
    const id = student.userUpdatedId;
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
