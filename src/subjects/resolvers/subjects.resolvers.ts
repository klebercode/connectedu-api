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
import { CreateSubjectInput } from '../types/create-subject.input';
import { MyContext } from '../../common/types/myContext';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectsService } from '../subjects.service';
import { UsersService } from '../../users/users.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => SubjectEntity)
export class SubjectsResolver {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => SubjectEntity, { name: 'subject' })
  async getSubject(@Args('id') id: number): Promise<SubjectEntity> {
    return await this.subjectsService.findOneById(id);
  }

  @Query(() => [SubjectEntity], { name: 'subjectAll' })
  async getSubjects(): Promise<SubjectEntity[]> {
    return this.subjectsService.findAll();
  }

  @Mutation(() => SubjectEntity, { name: 'subjectCreate' })
  async createSubject(
    @Context() context: MyContext,
    @Args('createData') createData: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.create(createData, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'subjectDelete' })
  async deleteSubject(@Args('id') id: number): Promise<boolean> {
    await this.subjectsService.remove(id);
    const obj = await this.subjectsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => SubjectEntity, { name: 'subjectUpdate' })
  async updateSubject(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('updateData') updateData: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    try {
      const { user } = context.req;
      const obj = await this.subjectsService.update(
        id,
        { ...updateData },
        user['id'],
      );
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() subjectEntity: SubjectEntity): Promise<any> {
    const id = subjectEntity.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() subjectEntity: SubjectEntity) {
    const id = subjectEntity.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
