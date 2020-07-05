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
import { CreateOccurrenceInput } from '../types/create-occurrence.input';
import { MyContext } from '../../common/types/myContext';
import { OccurrenceEntity } from '../entities/occurrence.entity';
import { OccurrencesService } from '../occurrences.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => OccurrenceEntity)
export class OccurrencesResolver {
  constructor(
    private readonly occurrencesService: OccurrencesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => OccurrenceEntity, { name: 'occurrence' })
  async getOccurrence(@Args('id') id: number): Promise<OccurrenceEntity> {
    return await this.occurrencesService.findOneById(id);
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceAll' })
  async getOccurrences(): Promise<OccurrenceEntity[]> {
    return this.occurrencesService.findAll();
  }

  @Mutation(() => OccurrenceEntity, { name: 'occurrenceCreate' })
  async createOccurrence(
    @Context() context: MyContext,
    @Args('input') input: CreateOccurrenceInput,
  ): Promise<OccurrenceEntity> {
    try {
      const { user } = context.req;
      const obj = await this.occurrencesService.create(input, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'occurrenceDelete' })
  async deleteOccurrence(@Args('id') id: number): Promise<boolean> {
    await this.occurrencesService.remove(id);
    const obj = await this.occurrencesService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => OccurrenceEntity, { name: 'occurrenceUpdate' })
  async updateOccurrence(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateOccurrenceInput,
  ): Promise<OccurrenceEntity> {
    try {
      const { user } = context.req;
      const obj = await this.occurrencesService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
