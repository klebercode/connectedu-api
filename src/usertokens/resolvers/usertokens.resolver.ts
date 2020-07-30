import { UseGuards, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import {
  UserTokenEntity,
  UserTokensPaginated,
} from '../entities/usertokens.object';
import { UserTokensService } from '../usertokens.service';
import { CreateUserTokenInput } from '../types/create-usertoken.input';
import { UpdateUserTokenInput } from '../types/update-usertoken.input';

import { MyContext } from '../../common/types/myContext';
import { OrganizationsService } from '../../organizations/organizations.service';
import { CustomersService } from '../../customers/customers.service';
import { CustomException } from '../../common/filters/http-exception.filter';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserTokenEntity)
@UseFilters(HttpExceptionFilter)
export class UserTokensResolver extends ResolverPublic<
  UserTokenEntity,
  CreateUserTokenInput,
  UpdateUserTokenInput
> {
  constructor(
    private readonly userTokensService: UserTokensService,
    private readonly organizationsService: OrganizationsService,
    private readonly customersService: CustomersService,
  ) {
    super('Tokens de Usuários', userTokensService);
  }

  @Query(() => UserTokenEntity, { name: 'userToken' })
  async get(@Args('id') id: number): Promise<UserTokenEntity> {
    return super.get(id);
  }

  @Query(() => [UserTokenEntity], { name: 'userTokenAll' })
  async getAll(): Promise<UserTokenEntity[]> {
    return super.getAll();
  }

  @Query(() => UserTokensPaginated, { name: 'userTokenPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<UserTokensPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [UserTokenEntity], { name: 'userTokenMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<UserTokenEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => UserTokenEntity, { name: 'userTokenCreate' })
  async createOwerToken(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => CreateUserTokenInput })
    input: CreateUserTokenInput,
  ): Promise<UserTokenEntity> {
    return this.userTokensService.createOwer(context, input);
  }

  @Mutation(() => [UserTokenEntity], { name: 'userTokenCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateUserTokenInput] })
    input: [CreateUserTokenInput],
  ): Promise<UserTokenEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'userTokenDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'userTokenDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => UserTokenEntity, { name: 'userTokenUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateUserTokenInput,
  ): Promise<UserTokenEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'userTokenUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateUserTokenInput] })
    input: [UpdateUserTokenInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('organization')
  async organization(@Parent() userTokenEntity: UserTokenEntity): Promise<any> {
    const id = userTokenEntity.organizationId;
    if (!id) {
      return null;
    }
    try {
      return this.organizationsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Organização');
    }
  }

  @ResolveField('customer')
  async customer(@Parent() userTokenEntity: UserTokenEntity): Promise<any> {
    const id = userTokenEntity.customerId;
    if (!id) {
      return null;
    }
    try {
      return this.customersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Schema Cliente');
    }
  }
}
