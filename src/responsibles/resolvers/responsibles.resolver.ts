import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import {
  ResponsibleEntity,
  ResponsiblePaginated,
} from '../entities/responsible.entity';
import { ResponsiblesService } from '../responsibles.service';
import { CreateResponsibleInput } from '../types/create-responsible.input';
import { UpdateResponsibleInput } from '../types/update-responsible.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ResponsibleEntity)
@UseFilters(HttpExceptionFilter)
export class ResponsiblesResolver extends ResolverDefault<
  ResponsibleEntity,
  CreateResponsibleInput,
  UpdateResponsibleInput
> {
  constructor(
    private readonly responsiblesService: ResponsiblesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {
    super('Responsável', responsiblesService);
  }

  @Query(() => ResponsibleEntity, { name: 'responsible' })
  async get(@Args('id') id: number): Promise<ResponsibleEntity> {
    return super.get(id);
  }

  @Query(() => ResponsiblePaginated, { name: 'responsiblePages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<ResponsiblePaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [ResponsibleEntity], { name: 'responsibleAll' })
  async getAll(): Promise<ResponsibleEntity[]> {
    return super.getAll();
  }

  @Query(() => [ResponsibleEntity], { name: 'responsibleMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<ResponsibleEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => ResponsibleEntity, { name: 'responsibleCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateResponsibleInput,
  ): Promise<ResponsibleEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [ResponsibleEntity], { name: 'subjectCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateResponsibleInput] })
    input: [CreateResponsibleInput],
  ): Promise<ResponsibleEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'responsibleDelete' })
  async detele(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'responsibleDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => ResponsibleEntity, { name: 'responsibleUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateResponsibleInput,
  ): Promise<ResponsibleEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'responsibleUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateResponsibleInput] })
    input: [UpdateResponsibleInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('state')
  async state(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.stateId;
    if (!id) {
      return null;
    }
    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }

  @ResolveField('city')
  async city(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.cityId;
    if (!id) {
      return null;
    }
    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() responsible: ResponsibleEntity): Promise<any> {
    const id = responsible.userCreatedId;
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.userUpdatedId;
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
}
