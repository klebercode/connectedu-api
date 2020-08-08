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

import { CompaniesService } from '../../companies/companies.service';
import { YearsService } from '../../years/years.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';
import { UserCentersService } from '../../usercenter/usercenters.service';
import { UserCenterEntity } from '../../usercenter/entities/usercenter.entity';

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
    private readonly userCentersService: UserCentersService,
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
  async year(@Parent() classRoom: ClassRoomEntity): Promise<any> {
    const id = classRoom.yearId;
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
  async company(@Parent() classRoom: ClassRoomEntity): Promise<any> {
    const id = classRoom.companyId;
    if (!id) {
      return null;
    }
    try {
      return this.companiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Empresa');
    }
  }

  @ResolveField(() => UserCenterEntity, { name: 'userCreated' })
  async userCreated(@Parent() classRoom: ClassRoomEntity) {
    const id = classRoom.userCreatedId;
    if (!id) {
      return null;
    }

    try {
      return this.userCentersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Central de Usuários');
    }
  }

  @ResolveField(() => UserCenterEntity, { name: 'userUpdated' })
  async userUpdated(@Parent() classRoom: ClassRoomEntity) {
    const id = classRoom.userUpdatedId;
    if (!id) {
      return null;
    }

    try {
      return this.userCentersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Central de Usuários');
    }
  }
}
