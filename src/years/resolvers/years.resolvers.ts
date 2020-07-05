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
import { CreateYearInput } from '../types/create-year.input';
import { MyContext } from '../../common/types/myContext';
import { YearEntity } from '../entities/year.entity';
import { YearsService } from '../years.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => YearEntity)
export class YearsResolver {
  constructor(
    private readonly yearsService: YearsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => YearEntity, { name: 'year' })
  async getYear(@Args('id') id: number): Promise<YearEntity> {
    return await this.yearsService.findOneById(id);
  }

  @Query(() => [YearEntity], { name: 'yearAll' })
  async getYears(): Promise<YearEntity[]> {
    return this.yearsService.findAll();
  }

  @Mutation(() => YearEntity, { name: 'yearCreate' })
  async createYear(
    @Context() context: MyContext,
    @Args('input') input: CreateYearInput,
  ): Promise<YearEntity> {
    try {
      const { user } = context.req;
      const obj = await this.yearsService.create(input, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'yearDelete' })
  async deleteYear(@Args('id') id: number): Promise<boolean> {
    await this.yearsService.remove(id);
    const obj = await this.yearsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(() => YearEntity, { name: 'yearUpdate' })
  async updateYear(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateYearInput,
  ): Promise<YearEntity> {
    try {
      const { user } = context.req;
      const obj = await this.yearsService.update(id, { ...input }, user['id']);
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }
  @ResolveField(() => UserEntity)
  async userCreated(@Parent() yearEntity: YearEntity): Promise<any> {
    const id = yearEntity.userCreatedId;
    return this.usersService.findOneById(id);
  }
  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() yearEntity: YearEntity) {
    const id = yearEntity.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
