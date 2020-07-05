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
import { CreateClassRoomInput } from '../types/create-classroom.input';
import { MyContext } from '../../common/types/myContext';
import { ClassRoomEntity } from '../entities/classroom.entity';
import { ClassRoomsService } from '../classrooms.service';
import { UsersService } from '../../users/users.service';
import { CompaniesService } from '../../companies/companies.service';
import { YearsService } from '../../years/years.service';
import { UserEntity } from '../../users/entities/user.entity';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomEntity)
export class ClassRoomsResolver {
  constructor(
    private readonly classRoomsService: ClassRoomsService,
    private readonly usersService: UsersService,
    private readonly yearsService: YearsService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Query(() => ClassRoomEntity, { name: 'classRoom' })
  async getClassRoom(@Args('id') id: number): Promise<ClassRoomEntity> {
    return await this.classRoomsService.findOneById(id);
  }

  @Query(() => [ClassRoomEntity], { name: 'classRoomAll' })
  async getClassRooms(): Promise<ClassRoomEntity[]> {
    return this.classRoomsService.findAll();
  }

  @Mutation(() => ClassRoomEntity, { name: 'classRoomCreate' })
  async createClassRoom(
    @Context() context: MyContext,
    @Args('input') input: CreateClassRoomInput,
  ): Promise<ClassRoomEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomsService.create(input, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'classRoomDelete' })
  async deleteClassRoom(@Args('id') id: number): Promise<boolean> {
    await this.classRoomsService.remove(id);
    const obj = await this.classRoomsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => ClassRoomEntity, { name: 'classRoomUpdate' })
  async updateClassRoom(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateClassRoomInput,
  ): Promise<ClassRoomEntity> {
    try {
      const { user } = context.req;
      const obj = await this.classRoomsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('year')
  async year(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.yearId;
    if (!id) {
      return null;
    }
    return this.yearsService.findOneById(id);
  }

  @ResolveField('company')
  async company(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.companyId;
    if (!id) {
      return null;
    }
    return this.companiesService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userCreated(@Parent() classRoomEntity: ClassRoomEntity): Promise<any> {
    const id = classRoomEntity.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() classRoomEntity: ClassRoomEntity) {
    const id = classRoomEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
