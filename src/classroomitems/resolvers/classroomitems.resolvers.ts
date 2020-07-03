import { UseGuards, HttpException } from '@nestjs/common';
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

import { ClassRoomsService } from '../../classrooms/classrooms.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomItemEntity)
export class ClassRoomItemsResolver {
  constructor(
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly usersService: UsersService,
    private readonly classRoomsService: ClassRoomsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
  ) {}

  @Query(() => ClassRoomItemEntity, { name: 'classRoomItem' })
  async getClassRoomItem(@Args('id') id: number): Promise<ClassRoomItemEntity> {
    return await this.classRoomItemsService.findOneById(id);
  }

  @Query(() => [ClassRoomItemEntity], { name: 'classRoomItemAll' })
  async getClassRoomItems(): Promise<ClassRoomItemEntity[]> {
    return this.classRoomItemsService.findAll();
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'classRoomItemDelete' })
  async deleteClassRoomItem(@Args('id') id: number): Promise<boolean> {
    await this.classRoomItemsService.remove(id);
    const obj = await this.classRoomItemsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('classroom')
  async classroom(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.classroomId;
    return this.classRoomsService.findOneById(id);
  }

  @ResolveField('subject')
  async subject(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.subjectId;
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.teacherId;
    return this.teachersService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(
    @Parent() classRoomItemEntity: ClassRoomItemEntity,
  ): Promise<any> {
    const id = classRoomItemEntity.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() classRoomItemEntity: ClassRoomItemEntity) {
    const id = classRoomItemEntity.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
