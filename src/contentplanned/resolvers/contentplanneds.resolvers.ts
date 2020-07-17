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

import { CreatContentPlannedInput } from '../types/create-contentplanned.input';
import { ContentPlannedEntity } from '../entities/contentplanned.entity';
import { ContentPlannedsService } from '../contentplanneds.service';

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
@Resolver(of => ContentPlannedEntity)
@UseFilters(HttpExceptionFilter)
export class ContentPlannedsResolver {
  constructor(
    private readonly contentPlannedsService: ContentPlannedsService,
    private readonly usersService: UsersService,
    private readonly yearsService: YearsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
    private readonly classRoomsService: ClassRoomsService,
  ) {}
  private nameApp = 'Conteúdo Planejado';

  @Query(() => ContentPlannedEntity, { name: 'contentPlanned' })
  async getContentPlanned(
    @Args('id') id: number,
  ): Promise<ContentPlannedEntity> {
    try {
      const obj = await this.contentPlannedsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [ContentPlannedEntity], { name: 'contentPlannedAll' })
  async getContentPlanneds(): Promise<ContentPlannedEntity[]> {
    try {
      return this.contentPlannedsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => ContentPlannedEntity, {
    name: 'contentPlannedCreate',
  })
  async createContentPlanned(
    @Context() context: MyContext,
    @Args('input') input: CreatContentPlannedInput,
  ): Promise<ContentPlannedEntity> {
    try {
      const { user } = context.req;
      const obj = await this.contentPlannedsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'contentPlannedDelete' })
  async deleteContentPlanned(@Args('id') id: number): Promise<boolean> {
    try {
      await this.contentPlannedsService.remove(id);
      const obj = await this.contentPlannedsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => ContentPlannedEntity, {
    name: 'contentPlannedUpdate',
  })
  async updateContentPlanned(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreatContentPlannedInput,
  ): Promise<ContentPlannedEntity> {
    try {
      const { user } = context.req;
      const obj = await this.contentPlannedsService.update(
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.classroomId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.teacherId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.yearId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.subjectId;
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
    @Parent() contentPlannedEntity: ContentPlannedEntity,
  ): Promise<any> {
    const id = contentPlannedEntity.userCreatedId;
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
  async userUpdated(@Parent() contentPlannedEntity: ContentPlannedEntity) {
    const id = contentPlannedEntity.userUpdatedId;
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
