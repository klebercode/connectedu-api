import {
  UseGuards,
  HttpException,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';

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
import { CreateClassRoomItemInput } from '../types/create-classroomitem.input';
import { MyContext } from '../../common/types/myContext';
import { ClassRoomItemEntity } from '../entities/classroomitem.entity';
import { ClassRoomItemsService } from '../classroomitems.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

import { ClassRoomsService } from '../../classrooms/classrooms.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomItemEntity)
@UseFilters(HttpExceptionFilter)
export class ClassRoomItemsResolver {
  constructor(
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly usersService: UsersService,
    private readonly classRoomsService: ClassRoomsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
  ) {}
  private nameApp = 'Matéria-Série';

  @Query(() => ClassRoomItemEntity, { name: 'classRoomItem' })
  async getClassRoomItem(@Args('id') id: number): Promise<ClassRoomItemEntity> {
    try {
      const obj = await this.classRoomItemsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [ClassRoomItemEntity], { name: 'classRoomItemAll' })
  async getClassRoomItems(): Promise<ClassRoomItemEntity[]> {
    try {
      return this.classRoomItemsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => ClassRoomItemEntity, { name: 'classRoomItemCreate' })
  async createClassRoomItem(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomItemInput,
  ): Promise<ClassRoomItemEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomItemsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'classRoomItemDelete' })
  async deleteClassRoomItem(@Args('id') id: number): Promise<boolean> {
    try {
      await this.classRoomItemsService.remove(id);
      const obj = await this.classRoomItemsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => ClassRoomItemEntity, { name: 'classRoomItemUpdate' })
  async updateClassRoomItem(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateClassRoomItemInput,
  ): Promise<ClassRoomItemEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomItemsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
}
