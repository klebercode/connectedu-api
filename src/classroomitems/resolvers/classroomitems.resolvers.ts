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
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

import {
  ClassRoomItemEntity,
  ClassRoomItemPaginated,
} from '../entities/classroomitem.entity';
import { ClassRoomItemsService } from '../classroomitems.service';
import { CreateClassRoomItemInput } from '../types/create-classroomitem.input';
import { UpdateClassRoomItemInput } from '../types/update-classroomitem.input';

import { ClassRoomsService } from '../../classrooms/classrooms.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomItemEntity)
@UseFilters(HttpExceptionFilter)
export class ClassRoomItemsResolver extends ResolverDefault<
  ClassRoomItemEntity,
  CreateClassRoomItemInput,
  UpdateClassRoomItemInput
> {
  constructor(
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly classRoomsService: ClassRoomsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
  ) {
    super('Matéria-Série', classRoomItemsService);
  }

  @Query(() => ClassRoomItemEntity, { name: 'classRoomItem' })
  async get(@Args('id') id: number): Promise<ClassRoomItemEntity> {
    return super.get(id);
  }

  @Query(() => [ClassRoomItemEntity], { name: 'classRoomItemAll' })
  async getAll(): Promise<ClassRoomItemEntity[]> {
    return super.getAll();
  }

  @Query(() => ClassRoomItemPaginated, { name: 'classRoomItemPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<ClassRoomItemPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [ClassRoomItemEntity], { name: 'classRoomItemMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ClassRoomItemEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => ClassRoomItemEntity, { name: 'classRoomItemCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomItemInput,
  ): Promise<ClassRoomItemEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ClassRoomItemEntity], { name: 'classRoomItemMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateClassRoomItemInput] })
    input: [CreateClassRoomItemInput],
  ): Promise<ClassRoomItemEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomItemDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'classRoomItemDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ClassRoomItemEntity, { name: 'classRoomItemUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateClassRoomItemInput,
  ): Promise<ClassRoomItemEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomItemUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateClassRoomItemInput] })
    input: [UpdateClassRoomItemInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('classroom')
  async classroom(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.classroomId;
    if (!id) {
      return null;
    }
    try {
      return this.classRoomsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Série');
    }
  }

  @ResolveField('subject')
  async subject(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.subjectId;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.teacherId;
    if (!id) {
      return null;
    }
    try {
      return this.teachersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Professor');
    }
  }

  /*
  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.userCreatedId;
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
  async userUpdated(@Parent() classRoomItemEntity: ClassRoomItemEntity) {
    const id = classRoomItemEntity.userUpdatedId;
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
