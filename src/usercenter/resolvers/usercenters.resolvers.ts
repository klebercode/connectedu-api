import { UseGuards, UseFilters } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
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
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';
import { UserTypessService } from '../../usertypes/usertypes.service';
import { UserTypeEntity } from '../../usertypes/types/usertypes.object';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserCenterEntity)
@UseFilters(HttpExceptionFilter)
export class userCentersResolver extends ResolverDefault<
  UserCenterEntity,
  CreateUserCenterInput,
  UpdateUserCenterInput
> {
  constructor(
    private readonly userCentersService: UserCentersService,
    private readonly userTypessService: UserTypessService,
  ) {
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

  @Mutation(() => Boolean, { name: 'userUpdatePassword' })
  async updatePasswordUser(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const ret = await this.userCentersService.updateLoginPassword(
        id,
        login,
        password,
        user['id'],
      );
      return ret;
    } catch (error) {
      CustomException.catch(error, 'update', 'Password Usuário');
    }
  }

  // **************************************  Resolucao de Campos

  @ResolveField(() => UserTypeEntity)
  async temp(@Parent() userCenterEntity: UserCenterEntity): Promise<any> {
    const id = userCenterEntity.idUser;
    if (!id) {
      return null;
    }

    try {
      return this.userTypessService.findOneById(id, userCenterEntity.userType);
    } catch (error) {
      CustomException.catch(error, 'get', 'Tipo de Usuário');
    }
  }
}
