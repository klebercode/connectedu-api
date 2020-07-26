import { UseGuards, UseFilters } from '@nestjs/common';
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

import { YearEntity, YearPaginated } from '../entities/year.entity';
import { YearsService } from '../years.service';
import { CreateYearInput } from '../types/create-year.input';
import { UpdateYearInput } from '../types/update-year.input';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => YearEntity)
@UseFilters(HttpExceptionFilter)
export class YearsResolver extends ResolverDefault<
  YearEntity,
  CreateYearInput,
  UpdateYearInput
> {
  constructor(
    private readonly yearsService: YearsService,
    private readonly usersService: UsersService,
  ) {
    super('Exercício', yearsService);
  }

  @Query(() => YearEntity, { name: 'year' })
  async get(@Args('id') id: number): Promise<YearEntity> {
    return super.get(id);
  }

  @Query(() => [YearEntity], { name: 'yearAll' })
  async getAll(): Promise<YearEntity[]> {
    return super.getAll();
  }

  @Query(() => YearPaginated, { name: 'yearPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<YearPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [YearEntity], { name: 'yearMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<YearEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => YearEntity, { name: 'yearCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateYearInput,
  ): Promise<YearEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [YearEntity], { name: 'yearCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateYearInput] })
    input: [CreateYearInput],
  ): Promise<YearEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'yearDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'yearDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => YearEntity, { name: 'yearUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateYearInput,
  ): Promise<YearEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'yearUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateYearInput] })
    input: [UpdateYearInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() yearEntity: YearEntity): Promise<any> {
    const id = yearEntity.userCreatedId;
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
  async userUpdated(@Parent() yearEntity: YearEntity) {
    const id = yearEntity.userUpdatedId;
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
