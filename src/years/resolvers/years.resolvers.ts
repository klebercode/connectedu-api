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
import { CreateYearInput } from '../types/create-year.input';
import { MyContext } from '../../common/types/myContext';
import { YearEntity } from '../entities/year.entity';
import { YearsService } from '../years.service';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => YearEntity)
@UseFilters(HttpExceptionFilter)
export class YearsResolver {
  constructor(
    private readonly yearsService: YearsService,
    private readonly usersService: UsersService,
  ) {}
  private nameApp = 'Exercício';

  @Query(() => YearEntity, { name: 'year' })
  async getYear(@Args('id') id: number): Promise<YearEntity> {
    try {
      const obj = await this.yearsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [YearEntity], { name: 'yearAll' })
  async getYears(): Promise<YearEntity[]> {
    try {
      return this.yearsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'yearDelete' })
  async deleteYear(@Args('id') id: number): Promise<boolean> {
    try {
      await this.yearsService.remove(id);
      const obj = await this.yearsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
