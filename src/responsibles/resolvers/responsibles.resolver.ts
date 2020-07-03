import { UseGuards, HttpException } from '@nestjs/common';
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

import { ResponsibleEntity } from '../entities/responsible.entity';
import { ResponsiblesService } from '../responsibles.service';
import { CreateResponsibleInput } from '../types/create-responsible.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ResponsibleEntity)
export class ResponsiblesResolver {
  constructor(
    private readonly responsiblesService: ResponsiblesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  @Query(() => ResponsibleEntity, { name: 'responsible' })
  async getResponsible(@Args('id') id: number): Promise<ResponsibleEntity> {
    return await this.responsiblesService.findOneById(id);
  }

  @Query(() => [ResponsibleEntity], { name: 'responsibleAll' })
  async getResponsibles(): Promise<ResponsibleEntity[]> {
    return await this.responsiblesService.findAll();
  }

  @Mutation(() => ResponsibleEntity, { name: 'responsibleCreate' })
  async createResponsible(
    @Context() context: MyContext,
    @Args('input') input: CreateResponsibleInput,
  ): Promise<ResponsibleEntity> {
    try {
      const { user } = context.req;
      const responsible = await this.responsiblesService.create(
        input,
        user['id'],
      );

      return responsible;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => ResponsibleEntity, { name: 'responsibleUpdate' })
  async updateResponsible(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateResponsibleInput,
  ): Promise<ResponsibleEntity> {
    try {
      const { user } = context.req;
      const responsible = await this.responsiblesService.update(
        id,
        { ...input },
        user['id'],
      );

      return responsible;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'responsibleDelete' })
  async deteleResponsible(@Args('id') id: number): Promise<boolean> {
    await this.responsiblesService.remove(id);
    const responsible = await this.responsiblesService.findOneById(id);
    if (!responsible) {
      return true;
    }
    return false;
  }

  @ResolveField('state')
  async state(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.stateId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('city')
  async city(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.cityId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() responsible: ResponsibleEntity): Promise<any> {
    const id = responsible.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() responsible: ResponsibleEntity) {
    const id = responsible.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
