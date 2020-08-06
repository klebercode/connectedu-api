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

import { KeyAcessEntity, KeyAcessPaginated } from '../entities/keyacess.object';
import { KeyAcessService } from '../keyacess.service';
import { CreateKeyAcessInput } from '../types/create-keyacess.input';
import { UpdateKeyAcessInput } from '../types/update-keyacess.input';

import { MyContext } from '../../common/types/myContext';
import { OrganizationsService } from '../../organizations/organizations.service';
import { CustomersService } from '../../customers/customers.service';
import { CustomException } from '../../common/filters/http-exception.filter';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => KeyAcessEntity)
@UseFilters(HttpExceptionFilter)
export class KeyAcessResolver extends ResolverPublic<
  KeyAcessEntity,
  CreateKeyAcessInput,
  UpdateKeyAcessInput
> {
  constructor(
    private readonly keyAcessService: KeyAcessService,
    private readonly organizationsService: OrganizationsService,
    private readonly customersService: CustomersService,
  ) {
    super('Chaves de Acesso', keyAcessService);
  }

  @Query(() => KeyAcessEntity, { name: 'keyAcess' })
  async get(@Args('id') id: number): Promise<KeyAcessEntity> {
    return super.get(id);
  }

  @Query(() => [KeyAcessEntity], { name: 'keyAcessAll' })
  async getAll(): Promise<KeyAcessEntity[]> {
    return super.getAll();
  }

  @Query(() => KeyAcessPaginated, { name: 'keyAcessPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<KeyAcessPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [KeyAcessEntity], { name: 'keyAcessMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<KeyAcessEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => KeyAcessEntity, { name: 'keyAcessCreate' })
  async createOwerToken(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => CreateKeyAcessInput })
    input: CreateKeyAcessInput,
  ): Promise<KeyAcessEntity> {
    return this.keyAcessService.createToken(context, input);
  }

  @Mutation(() => [KeyAcessEntity], { name: 'keyAcessCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateKeyAcessInput] })
    input: [CreateKeyAcessInput],
  ): Promise<KeyAcessEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'keyAcessDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'keyAcessDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => KeyAcessEntity, { name: 'keyAcessUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateKeyAcessInput,
  ): Promise<KeyAcessEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'keyAcessUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateKeyAcessInput] })
    input: [UpdateKeyAcessInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('organization')
  async organization(@Parent() keyAcessEntity: KeyAcessEntity): Promise<any> {
    const id = keyAcessEntity.organizationId;
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
  async customer(@Parent() keyAcessEntity: KeyAcessEntity): Promise<any> {
    const id = keyAcessEntity.customerId;
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
