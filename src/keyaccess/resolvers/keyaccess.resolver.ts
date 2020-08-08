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
  KeyAccessEntity,
  KeyAccessPaginated,
} from '../entities/keyaccess.object';
import { KeyAccessService } from '../keyaccess.service';
import { CreateKeyAccessInput } from '../types/create-keyaccess.input';
import { UpdateKeyAccessInput } from '../types/update-keyaccess.input';

import { MyContext } from '../../common/types/mycontext';
import { OrganizationsService } from '../../organizations/organizations.service';
import { CustomersService } from '../../customers/customers.service';
import { CustomException } from '../../common/filters/http-exception.filter';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => KeyAccessEntity)
@UseFilters(HttpExceptionFilter)
export class KeyAccessResolver extends ResolverPublic<
  KeyAccessEntity,
  CreateKeyAccessInput,
  UpdateKeyAccessInput
> {
  constructor(
    private readonly keyAccessService: KeyAccessService,
    //private readonly organizationsService: OrganizationsService,
    private readonly customersService: CustomersService,
  ) {
    super('Chaves de Acesso', keyAccessService);
  }

  @Query(() => KeyAccessEntity, { name: 'keyAccess' })
  async get(@Args('id') id: number): Promise<KeyAccessEntity> {
    return super.get(id);
  }

  @Query(() => [KeyAccessEntity], { name: 'keyAccessAll' })
  async getAll(): Promise<KeyAccessEntity[]> {
    return super.getAll();
  }

  @Query(() => KeyAccessPaginated, { name: 'keyAccessPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<KeyAccessPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [KeyAccessEntity], { name: 'keyAccessMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<KeyAccessEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => KeyAccessEntity, { name: 'keyAccessCreate' })
  async createOwerToken(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => CreateKeyAccessInput })
    input: CreateKeyAccessInput,
  ): Promise<KeyAccessEntity> {
    return this.keyAccessService.createToken(context, input);
  }

  @Mutation(() => [KeyAccessEntity], { name: 'keyAccessCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateKeyAccessInput] })
    input: [CreateKeyAccessInput],
  ): Promise<KeyAccessEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'keyAccessDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'keyAccessDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => KeyAccessEntity, { name: 'keyAccessUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateKeyAccessInput,
  ): Promise<KeyAccessEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'keyAccessUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateKeyAccessInput] })
    input: [UpdateKeyAccessInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }

  // **************************************  Resolucao de Campos

  /*
  @ResolveField('organization')  
  async organization(@Parent() keyAccessEntity: KeyAccessEntity): Promise<any> {
    const id = keyAccessEntity.organizationId;
    if (!id) {
      return null;
    }
    try {
      return this.organizationsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Organização');
    }
  }
  */

  @ResolveField('customer')
  async customer(@Parent() keyAccessEntity: KeyAccessEntity): Promise<any> {
    const id = keyAccessEntity.customerId;
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
