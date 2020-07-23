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
import { MyContext } from '../../common/types/myContext';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

import { ClassRoomInjectEntity } from '../entities/classroominject.entity';
import { ClassRoomInjectsService } from '../classroominjects.service';
import { CreateClassRoomInjectInput } from '../types/create-classroominject.input';
import { UpdateClassRoomInjectInput } from '../types/update-classroominject.input';

import { SubjectsService } from '../../subjects/subjects.service';
import { ClassRoomItemsService } from '../../classroomitems/classroomitems.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomInjectEntity)
@UseFilters(HttpExceptionFilter)
export class ClassRoomInjectsResolver extends ResolverDefault<
  ClassRoomInjectEntity,
  CreateClassRoomInjectInput,
  UpdateClassRoomInjectInput
> {
  constructor(
    private readonly classRoomInjectsService: ClassRoomInjectsService,
    private readonly usersService: UsersService,
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly subjectsService: SubjectsService,
  ) {
    super('Matéria-Composta', classRoomInjectsService);
  }

  @Query(() => ClassRoomInjectEntity, { name: 'classRoomInject' })
  async get(@Args('id') id: number): Promise<ClassRoomInjectEntity> {
    return super.get(id);
  }

  @Query(() => [ClassRoomInjectEntity], { name: 'classRoomInjectMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ClassRoomInjectEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [ClassRoomInjectEntity], { name: 'classRoomInjectAll' })
  async getAll(): Promise<ClassRoomInjectEntity[]> {
    return super.getAll();
  }

  @Mutation(() => ClassRoomInjectEntity, { name: 'classRoomInjectCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomInjectInput,
  ): Promise<ClassRoomInjectEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ClassRoomInjectEntity], {
    name: 'classRoomInjectCreateMany',
  })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateClassRoomInjectInput] })
    input: [CreateClassRoomInjectInput],
  ): Promise<ClassRoomInjectEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomInjectDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'classRoomInjectDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ClassRoomInjectEntity, { name: 'classRoomInjectUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateClassRoomInjectInput,
  ): Promise<ClassRoomInjectEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'classRoomInjectUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateClassRoomInjectInput] })
    input: [UpdateClassRoomInjectInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('classroomItem')
  async classroomItem(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.classroomItemId;
    if (!id) {
      return null;
    }
    try {
      return this.classRoomItemsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria-Série');
    }
  }

  @ResolveField('subject1')
  async subject1(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject1Id;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField('subject2')
  async subject2(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject2Id;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField('subject3')
  async subject3(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject3Id;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField('subject4')
  async subject4(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject4Id;
    if (!id) {
      return null;
    }
    try {
      return this.subjectsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Matéria');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.userCreatedId;
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
  async userUpdated(@Parent() classRoomInjectEntity: ClassRoomInjectEntity) {
    const id = classRoomInjectEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuario');
    }
  }
}
