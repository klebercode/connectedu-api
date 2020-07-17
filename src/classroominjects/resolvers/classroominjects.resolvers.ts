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
import { CreateClassRoomInjectInput } from '../types/create-classroominject.input';
import { MyContext } from '../../common/types/myContext';
import { ClassRoomInjectEntity } from '../entities/classroominject.entity';
import { ClassRoomInjectsService } from '../classroominjects.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

import { SubjectsService } from '../../subjects/subjects.service';
import { ClassRoomItemsService } from '../../classroomitems/classroomitems.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ClassRoomInjectEntity)
@UseFilters(HttpExceptionFilter)
export class ClassRoomInjectsResolver {
  constructor(
    private readonly classRoomInjectsService: ClassRoomInjectsService,
    private readonly usersService: UsersService,
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly subjectsService: SubjectsService,
  ) {}
  private nameApp = 'Materia-Composta';

  @Query(() => ClassRoomInjectEntity, { name: 'classRoomInject' })
  async getClassRoomInject(
    @Args('id') id: number,
  ): Promise<ClassRoomInjectEntity> {
    try {
      const obj = await this.classRoomInjectsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [ClassRoomInjectEntity], { name: 'classRoomInjectAll' })
  async getClassRoomInjects(): Promise<ClassRoomInjectEntity[]> {
    try {
      return this.classRoomInjectsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'classRoomInjectDelete' })
  async deleteClassRoomInject(@Args('id') id: number): Promise<boolean> {
    try {
      await this.classRoomInjectsService.remove(id);
      const obj = await this.classRoomInjectsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
      CustomException.catch(error, 'get', 'Materia-Série');
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
      CustomException.catch(error, 'get', 'Materia');
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
      CustomException.catch(error, 'get', 'Materia');
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
      CustomException.catch(error, 'get', 'Materia');
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
      CustomException.catch(error, 'get', 'Materia');
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
