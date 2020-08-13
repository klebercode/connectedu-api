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

import { CompanyEntity, CompanyPaginated } from '../entities/company.entity';
import { CompaniesService } from '../companies.service';
import { CreateCompanyInput } from '../types/create-company.input';
import { UpdateCompanyInput } from '../types/update-company.input';

import { MyContext } from '../../common/types/mycontext';
import { StatesService } from '../../states/states.service';
import { CitiesService } from '../../cities/cities.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

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
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {
    super('Empresa', companiesService);
  }

  @Query(() => CompanyEntity, { name: 'company' })
  async get(@Args('id') id: number): Promise<CompanyEntity> {
    return super.get(id);
  }

  @Query(() => [CompanyEntity], { name: 'companyAll' })
  async getAll(): Promise<CompanyEntity[]> {
    return super.getAll();
  }

  @Query(() => CompanyPaginated, { name: 'companyPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<CompanyPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [CompanyEntity], { name: 'companyMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<CompanyEntity[]> {
    return super.getMany(ids);
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
}
