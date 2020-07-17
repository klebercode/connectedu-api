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
import { CreateOccurrenceInput } from '../types/create-occurrence.input';
import { MyContext } from '../../common/types/myContext';
import { OccurrenceEntity } from '../entities/occurrence.entity';
import { OccurrencesService } from '../occurrences.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => OccurrenceEntity)
@UseFilters(HttpExceptionFilter)
export class OccurrencesResolver {
  constructor(
    private readonly occurrencesService: OccurrencesService,
    private readonly usersService: UsersService,
  ) {}
  private nameApp = 'Ocorrência';

  @Query(() => OccurrenceEntity, { name: 'occurrence' })
  async getOccurrence(@Args('id') id: number): Promise<OccurrenceEntity> {
    try {
      const obj = await this.occurrencesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [OccurrenceEntity], { name: 'occurrenceAll' })
  async getOccurrences(): Promise<OccurrenceEntity[]> {
    try {
      return this.occurrencesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'occurrenceDelete' })
  async deleteOccurrence(@Args('id') id: number): Promise<boolean> {
    try {
      await this.occurrencesService.remove(id);
      const obj = await this.occurrencesService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userCreatedId;
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
  async userUpdated(@Parent() occurrence: OccurrenceEntity): Promise<any> {
    const id = occurrence.userUpdatedId;
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
