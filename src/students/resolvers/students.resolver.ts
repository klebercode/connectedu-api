import { UseGuards, UseFilters } from '@nestjs/common';
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

import { StudentEntity, StudentPaginated } from '../entities/student.entity';
import { StudentsService } from '../students.service';
import { CreateStudentInput } from '../types/create-student.input';
import { UpdateStudentInput } from '../types/update-student.input';

import { MyContext } from '../../common/types/mycontext';
import { StatesService } from '../../states/states.service';
import { CitiesService } from '../../cities/cities.service';
import { ResponsiblesService } from '../../responsibles/responsibles.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

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

  @Query(() => [StudentEntity], { name: 'studentAll' })
  async getAll(): Promise<StudentEntity[]> {
    return super.getAll();
  }

  @Query(() => StudentPaginated, { name: 'studentPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<StudentPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [StudentEntity], { name: 'studentMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentEntity[]> {
    return super.getMany(ids);
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
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'studentDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
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
}
