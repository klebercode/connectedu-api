import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';

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

import { CreatContentAppliedInput } from '../types/create-contentapplied.input';
import { ContentAppliedEntity } from '../entities/contentapplied.entity';
import { ContentAppliedsService } from '../contentapplieds.service';

//importados
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { YearsService } from '../../years/years.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { TeachersService } from '../../teachers/teachers.service';
import { ClassRoomsService } from '../../classrooms/classrooms.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ContentAppliedEntity)
@UseFilters(HttpExceptionFilter)
export class ContentAppliedsResolver {
  constructor(
    private readonly contentAppliedsService: ContentAppliedsService,
    private readonly usersService: UsersService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
    private readonly classRoomsService: ClassRoomsService,
  ) {}
  private nameApp = 'Conteúdo Vivenciado';

  @Query(() => ContentAppliedEntity, { name: 'contentApplied' })
  async getContentApplied(
    @Args('id') id: number,
  ): Promise<ContentAppliedEntity> {
    try {
      const obj = await this.contentAppliedsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [ContentAppliedEntity], { name: 'contentAppliedAll' })
  async getContentApplieds(): Promise<ContentAppliedEntity[]> {
    try {
      return this.contentAppliedsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => ContentAppliedEntity, {
    name: 'contentAppliedCreate',
  })
  async createContentApplied(
    @Context() context: MyContext,
    @Args('input') input: CreatContentAppliedInput,
  ): Promise<ContentAppliedEntity> {
    try {
      const { user } = context.req;
      const obj = await this.contentAppliedsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'contentAppliedDelete' })
  async deleteContentApplied(@Args('id') id: number): Promise<boolean> {
    try {
      await this.contentAppliedsService.remove(id);
      const obj = await this.contentAppliedsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => ContentAppliedEntity, {
    name: 'contentAppliedUpdate',
  })
  async updateContentApplied(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatContentAppliedInput,
  ): Promise<ContentAppliedEntity> {
    try {
      const { user } = context.req;
      const obj = await this.contentAppliedsService.update(
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
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.classroomId;
    if (!id) {
      return null;
    }
    try {
      return this.classRoomsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Série');
    }
  }

  @ResolveField('teacher')
  async teacher(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.teacherId;
    if (!id) {
      return null;
    }
    try {
      return this.teachersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Professor');
    }
  }

  @ResolveField('year')
  async year(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.yearId;
    if (!id) {
      return null;
    }
    try {
      return this.yearsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Exercício');
    }
  }

  @ResolveField('subject')
  async subject(
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.subjectId;
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
    @Parent() contentAppliedEntity: ContentAppliedEntity,
  ): Promise<any> {
    const id = contentAppliedEntity.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() contentAppliedEntity: ContentAppliedEntity) {
    const id = contentAppliedEntity.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
}
