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

import { MyContext } from '../../common/types/mycontext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import {
  UserCenterEntity,
  UserCenterPaginated,
} from '../entities/usercenter.entity';
import { UserCentersService } from '../usercenters.service';
import { CreateUserCenterInput } from '../types/create-usercenter.input';
import { UpdateUserCenterInput } from '../types/update-usercenter.input';

import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserCenterEntity)
@UseFilters(HttpExceptionFilter)
export class userCentersResolver extends ResolverDefault<
  UserCenterEntity,
  CreateUserCenterInput,
  UpdateUserCenterInput
> {
  constructor(private readonly userCentersService: UserCentersService) {
    super('Central de Usuários', userCentersService);
  }

  @Query(() => UserCenterEntity, { name: 'userCenter' })
  async get(@Args('id') id: number): Promise<UserCenterEntity> {
    return super.get(id);
  }

  @Query(() => [UserCenterEntity], { name: 'userCenterAll' })
  async getAll(): Promise<UserCenterEntity[]> {
    return super.getAll();
  }

  @Query(() => UserCenterPaginated, { name: 'userCenterPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<UserCenterPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [UserCenterEntity], { name: 'userCenterMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<UserCenterEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => UserCenterEntity, { name: 'userCenterCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateUserCenterInput,
  ): Promise<UserCenterEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [UserCenterEntity], { name: 'userCenterCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateUserCenterInput] })
    input: [CreateUserCenterInput],
  ): Promise<UserCenterEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'userCenterDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'userCenterDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => UserCenterEntity, { name: 'userCenterUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateUserCenterInput,
  ): Promise<UserCenterEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'userCenterUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateUserCenterInput] })
    input: [UpdateUserCenterInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  /*
  // **************************************  Resolucao de Campos

  @ResolveField(() => UserEntity)
  async userCreated(
    @Parent() userCenterEntity: UserCenterEntity,
  ): Promise<any> {
    const id = userCenterEntity.userCreatedId;
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
  async userUpdated(
    @Parent() userCenterEntity: UserCenterEntity,
  ): Promise<any> {
    const id = userCenterEntity.userUpdatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
  */
}
