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

import { ResponsibleEntity } from '../entities/responsible.entity';
import { ResponsiblesService } from '../responsibles.service';
import { CreateResponsibleInput } from '../types/create-responsible.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => ResponsibleEntity)
@UseFilters(HttpExceptionFilter)
export class ResponsiblesResolver {
  constructor(
    private readonly responsiblesService: ResponsiblesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}
  private nameApp = 'Responsável';

  @Query(() => ResponsibleEntity, { name: 'responsible' })
  async getResponsible(@Args('id') id: number): Promise<ResponsibleEntity> {
    try {
      const obj = await this.responsiblesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [ResponsibleEntity], { name: 'responsibleAll' })
  async getResponsibles(): Promise<ResponsibleEntity[]> {
    try {
      return this.responsiblesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'responsibleDelete' })
  async deteleResponsible(@Args('id') id: number): Promise<boolean> {
    try {
      await this.responsiblesService.remove(id);
      const responsible = await this.responsiblesService.findOneById(id);
      if (!responsible) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
