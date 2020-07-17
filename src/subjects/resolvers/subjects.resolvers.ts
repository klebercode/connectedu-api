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

import { MyContext } from '../../common/types/myContext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { CreateSubjectInput } from '../types/create-subject.input';
import { UpdateSubjectInput } from '../types/update-subject.input';

import { SubjectEntity } from '../entities/subject.entity';
import { SubjectsService } from '../subjects.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => SubjectEntity)
@UseFilters(HttpExceptionFilter)
export class SubjectsResolver {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly usersService: UsersService,
  ) {}
  private nameApp = 'Matéria';

  @Query(() => SubjectEntity, { name: 'subject' })
  async getSubject(@Args('id') id: number): Promise<SubjectEntity> {
    try {
      const obj = await this.subjectsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [SubjectEntity], { name: 'subjectAll' })
  async getSubjects(): Promise<SubjectEntity[]> {
    try {
      return this.subjectsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => SubjectEntity, { name: 'subjectCreate' })
  async createSubject(
    @Context() context: MyContext,
    @Args('input') input: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [SubjectEntity], { name: 'subjectCreateMany' })
  async createSubjectMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateSubjectInput] })
    input: [CreateSubjectInput],
  ): Promise<SubjectEntity[]> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.createMany(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'subjectDelete' })
  async deleteSubject(@Args('id') id: number): Promise<boolean> {
    try {
      await this.subjectsService.remove(id);
      const obj = await this.subjectsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => SubjectEntity, { name: 'subjectUpdate' })
  async updateSubject(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'subjectUpdateMany' })
  async updateSubjectMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateSubjectInput] })
    input: [UpdateSubjectInput],
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.updateMany(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'updateMany', this.nameApp);
    }
  }

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() subjectEntity: SubjectEntity): Promise<any> {
    const id = subjectEntity.userCreatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() subjectEntity: SubjectEntity): Promise<any> {
    const id = subjectEntity.userUpdatedId;
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
