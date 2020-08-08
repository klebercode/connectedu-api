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
  ClassRoomEntity,
  ClassRoomPaginated,
} from '../entities/classroom.entity';
import { ClassRoomsService } from '../classrooms.service';
import { CreateClassRoomInput } from '../types/create-classroom.input';
import { UpdateClassRoomInput } from '../types/update-classroom.input';

import { UsersService } from '../../users/users.service';
import { CompaniesService } from '../../companies/companies.service';
import { YearsService } from '../../years/years.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomEntity)
@UseFilters(HttpExceptionFilter)
export class ClassRoomsResolver extends ResolverDefault<
  ClassRoomEntity,
  CreateClassRoomInput,
  UpdateClassRoomInput
> {
  constructor(
    private readonly classRoomsService: ClassRoomsService,
    private readonly yearsService: YearsService,
    private readonly companiesService: CompaniesService,
  ) {
    super('Série', classRoomsService);
  }

  @Query(() => ClassRoomEntity, { name: 'classRoom' })
  async get(@Args('id') id: number): Promise<ClassRoomEntity> {
    return super.get(id);
  }

  @Query(() => [ClassRoomEntity], { name: 'classRoomAll' })
  async getAll(): Promise<ClassRoomEntity[]> {
    return super.getAll();
  }

  @Query(() => ClassRoomPaginated, { name: 'classRoomPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<ClassRoomPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [ClassRoomEntity], { name: 'classRoomMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ClassRoomEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => ClassRoomEntity, { name: 'classRoomCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomInput,
  ): Promise<ClassRoomEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ClassRoomEntity], { name: 'classRoomCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateClassRoomInput] })
    input: [CreateClassRoomInput],
  ): Promise<ClassRoomEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'classRoomDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ClassRoomEntity, { name: 'classRoomUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateClassRoomInput,
  ): Promise<ClassRoomEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateClassRoomInput] })
    input: [UpdateClassRoomInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('year')
  async year(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.yearId;
    if (!id) {
      return null;
    }
    try {
      return this.yearsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Exercício');
    }
  }

  @ResolveField('company')
  async company(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.companyId;
    if (!id) {
      return null;
    }
    try {
      return this.companiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Empresa');
    }
  }

  /*
  @ResolveField(type => UserEntity)
  async userCreated(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuario');
    }
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() classRoomEntity: ClassRoomEntity) {
    const id = classRoomEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuario');
    }
  }
  */
}
