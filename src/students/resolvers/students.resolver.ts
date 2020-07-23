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
import { UpdateStudentInput } from '../types/update-student.input';

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
import { ResolverDefault } from '../../common/resolvers/schema.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentEntity)
@UseFilters(HttpExceptionFilter)
export class studentsResolver extends ResolverDefault<
  StudentEntity,
  CreateStudentInput,
  UpdateStudentInput
> {
  constructor(
    private readonly studentsblesService: StudentsService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
    private readonly responsiblesService: ResponsiblesService,
  ) {
    super('Estudante', studentsblesService);
  }

  @Query(() => StudentEntity, { name: 'student' })
  async get(@Args('id') id: number): Promise<StudentEntity> {
    return super.get(id);
  }

  @Query(() => [StudentEntity], { name: 'studentMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [StudentEntity], { name: 'studentAll' })
  async getAll(): Promise<StudentEntity[]> {
    return super.getAll();
  }

  @Mutation(() => StudentEntity, { name: 'studentCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StudentEntity], { name: 'studentCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateStudentInput] })
    input: [CreateStudentInput],
  ): Promise<StudentEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'studentDelete' })
  async detele(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'studentDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => StudentEntity, { name: 'studentUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStudentInput,
  ): Promise<StudentEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'studentUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStudentInput] })
    input: [UpdateStudentInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

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
