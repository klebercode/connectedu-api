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
  AcessTokenEntity,
  AcessTokensPaginated,
} from '../entities/acesstokens.object';
import { AcessTokensService } from '../acesstokens.service';
import { CreateAcessTokenInput } from '../types/create-acesstoken.input';
import { UpdateAcessTokenInput } from '../types/update-acesstoken.input';

import { MyContext } from '../../common/types/myContext';
import { OrganizationsService } from '../../organizations/organizations.service';
import { CustomersService } from '../../customers/customers.service';
import { CustomException } from '../../common/filters/http-exception.filter';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => AcessTokenEntity)
@UseFilters(HttpExceptionFilter)
export class AcessTokensResolver extends ResolverPublic<
  AcessTokenEntity,
  CreateAcessTokenInput,
  UpdateAcessTokenInput
> {
  constructor(
    private readonly acessTokensService: AcessTokensService,
    private readonly organizationsService: OrganizationsService,
    private readonly customersService: CustomersService,
  ) {
    super('Tokens de Acesso', AcessTokensService);
  }

  @Query(() => AcessTokenEntity, { name: 'acessToken' })
  async get(@Args('id') id: number): Promise<AcessTokenEntity> {
    return super.get(id);
  }

  @Query(() => [AcessTokenEntity], { name: 'acessTokenAll' })
  async getAll(): Promise<AcessTokenEntity[]> {
    return super.getAll();
  }

  @Query(() => AcessTokensPaginated, { name: 'acessTokenPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<AcessTokensPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [AcessTokenEntity], { name: 'acessTokenMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<AcessTokenEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => AcessTokenEntity, { name: 'acessTokenCreate' })
  async createOwerToken(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => CreateAcessTokenInput })
    input: CreateAcessTokenInput,
  ): Promise<AcessTokenEntity> {
    return this.acessTokensService.createToken(context, input);
  }

  @Mutation(() => [AcessTokenEntity], { name: 'acessTokenCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateAcessTokenInput] })
    input: [CreateAcessTokenInput],
  ): Promise<AcessTokenEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'acessTokenDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'acessTokenDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => AcessTokenEntity, { name: 'acessTokenUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateAcessTokenInput,
  ): Promise<AcessTokenEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'acessTokenUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateAcessTokenInput] })
    input: [UpdateAcessTokenInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('organization')
  async organization(
    @Parent() acessTokenEntity: AcessTokenEntity,
  ): Promise<any> {
    const id = acessTokenEntity.organizationId;
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
  async customer(@Parent() acessTokenEntity: AcessTokenEntity): Promise<any> {
    const id = acessTokenEntity.customerId;
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
