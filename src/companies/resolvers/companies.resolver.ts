import {
  UseGuards,
  HttpException,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';

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

import { CompanyEntity } from '../entities/company.entity';
import { CompaniesService } from '../companies.service';
import { CreateCompanyInput } from '../types/create-company.input';
import { UpdateCompanyInput } from '../types/update-company.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/global.resolver';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => CompanyEntity)
@UseFilters(HttpExceptionFilter)
export class CompaniesResolver extends ResolverDefault<
  CompanyEntity,
  CreateCompanyInput,
  UpdateCompanyInput
> {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {
    super('Empresa', companiesService);
  }

  @Query(() => CompanyEntity, { name: 'company' })
  async get(@Args('id') id: number): Promise<CompanyEntity> {
    return super.get(id);
  }

  @Query(() => [CompanyEntity], { name: 'companyMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<CompanyEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [CompanyEntity], { name: 'companyAll' })
  async getAll(): Promise<CompanyEntity[]> {
    return super.getAll();
  }

  @Mutation(() => CompanyEntity, { name: 'companyCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateCompanyInput,
  ): Promise<CompanyEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [CompanyEntity], { name: 'companyCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateCompanyInput] })
    input: [CreateCompanyInput],
  ): Promise<CompanyEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'companyDelete' })
  async detele(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'companyDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => CompanyEntity, { name: 'companyUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateCompanyInput,
  ): Promise<CompanyEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'companyUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateCompanyInput] })
    input: [UpdateCompanyInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('state')
  async state(@Parent() company: CompanyEntity) {
    const id = company.stateId;
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
  async city(@Parent() company: CompanyEntity) {
    const id = company.cityId;
    if (!id) {
      return null;
    }
    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }

  @ResolveField(type => UserEntity)
  async userCreated(@Parent() company: CompanyEntity): Promise<any> {
    const id = company.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuario');
    }
  }

  @ResolveField(type => UserEntity)
  async userUpdated(@Parent() company: CompanyEntity) {
    const id = company.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuario');
    }
  }
}
