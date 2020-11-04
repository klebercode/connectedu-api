import { UseGuards, UseFilters } from '@nestjs/common';
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
  StudentCallEntity,
  StudentCallPaginated,
} from '../entities/studentcall.entity';
import { StudentCallsService } from '../studentcalls.service';
import { CreatStudentCallInput } from '../types/create-studentcall.input';
import { UpdateStudentCallInput } from '../types/update-studentcall.input';

//importados
import { StudentsService } from '../../students/students.service';
import { SubjectsService } from '../../subjects/subjects.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentCallEntity)
@UseFilters(HttpExceptionFilter)
export class StudentCallsResolver extends ResolverDefault<
  StudentCallEntity,
  CreatStudentCallInput,
  UpdateStudentCallInput
> {
  constructor(
    private readonly studentCallsService: StudentCallsService,
    private readonly studentsService: StudentsService,
    private readonly subjectsService: SubjectsService,
  ) {
    super('Chamada Estudantes', studentCallsService);
  }

  @Query(() => StudentCallEntity, { name: 'studentCall' })
  async get(@Args('id') id: number): Promise<StudentCallEntity> {
    return super.get(id);
  }

  @Query(() => [StudentCallEntity], { name: 'studentCallAll' })
  async getAll(): Promise<StudentCallEntity[]> {
    return super.getAll();
  }

  @Query(() => StudentCallPaginated, { name: 'studentCallPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<StudentCallPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [StudentCallEntity], { name: 'studentCallMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StudentCallEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => StudentCallEntity, {
    name: 'studentCallCreate',
  })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatStudentCallInput,
  ): Promise<StudentCallEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StudentCallEntity], { name: 'studentCallCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatStudentCallInput] })
    input: [CreatStudentCallInput],
  ): Promise<StudentCallEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'studentCallDelete' })
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'studentCallDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
  }

  @Mutation(() => StudentCallEntity, {
    name: 'studentCallUpdate',
  })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStudentCallInput,
  ): Promise<StudentCallEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'studentCallUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStudentCallInput] })
    input: [UpdateStudentCallInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('student')
  async student(@Parent() StudentCallEntity: StudentCallEntity): Promise<any> {
    const id = StudentCallEntity.studentId;
    if (!id) {
      return null;
    }
    try {
      return this.studentsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }

  @ResolveField('subject')
  async subject(@Parent() studentCallEntity: StudentCallEntity): Promise<any> {
    const id = studentCallEntity.subjectId;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estudante');
    }
  }
}
