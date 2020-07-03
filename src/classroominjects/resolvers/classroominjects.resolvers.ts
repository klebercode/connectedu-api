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
import { CreateClassRoomInjectInput } from '../types/create-classroominject.input';
import { MyContext } from '../../common/types/myContext';
import { ClassRoomInjectEntity } from '../entities/classroominject.entity';
import { ClassRoomInjectsService } from '../classroominjects.service';
import { UsersService } from '../../users/users.service';

import { SubjectsService } from '../../subjects/subjects.service';
import { ClassRoomItemsService } from '../../classroomitems/classroomitems.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomInjectEntity)
export class ClassRoomInjectsResolver {
  constructor(
    private readonly classRoomInjectsService: ClassRoomInjectsService,
    private readonly usersService: UsersService,
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Query(() => ClassRoomInjectEntity, { name: 'classRoomInject' })
  async getClassRoomInject(
    @Args('id') id: number,
  ): Promise<ClassRoomInjectEntity> {
    return await this.classRoomInjectsService.findOneById(id);
  }

  @Query(() => [ClassRoomInjectEntity], { name: 'classRoomInjectAll' })
  async getClassRoomInjects(): Promise<ClassRoomInjectEntity[]> {
    return this.classRoomInjectsService.findAll();
  }

  @Mutation(() => ClassRoomInjectEntity, { name: 'classRoomInjectCreate' })
  async createClassRoomInject(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomInjectInput,
  ): Promise<ClassRoomInjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomInjectsService.create(input, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'classRoomInjectDelete' })
  async deleteClassRoomInject(@Args('id') id: number): Promise<boolean> {
    await this.classRoomInjectsService.remove(id);
    const obj = await this.classRoomInjectsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => ClassRoomInjectEntity, { name: 'classRoomInjectUpdate' })
  async updateClassRoomInject(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateClassRoomInjectInput,
  ): Promise<ClassRoomInjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomInjectsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('classroomItem')
  async classroomItem(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.classroomItemId;
    return this.classRoomItemsService.findOneById(id);
  }

  @ResolveField('subject1')
  async subject1(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject1Id;
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('subject2')
  async subject2(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject2Id;
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('subject3')
  async subject3(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject3Id;
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('subject4')
  async subject4(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.subject4Id;
    return this.subjectsService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(
    @Parent() classRoomInjectEntity: ClassRoomInjectEntity,
  ): Promise<any> {
    const id = classRoomInjectEntity.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() classRoomInjectEntity: ClassRoomInjectEntity) {
    const id = classRoomInjectEntity.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
