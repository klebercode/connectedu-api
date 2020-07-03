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

import { CompanyEntity } from '../entities/company.entity';
import { CompaniesService } from '../companies.service';
import { CreateCompanyInput } from '../types/create-company.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => CompanyEntity)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  @Query(() => CompanyEntity, { name: 'company' })
  async getCompany(@Args('id') id: number): Promise<CompanyEntity> {
    return await this.companiesService.findOneById(id);
  }

  @Query(() => [CompanyEntity], { name: 'companyAll' })
  async getCompanies(): Promise<CompanyEntity[]> {
    return await this.companiesService.findAll();
  }

  @Mutation(() => CompanyEntity, { name: 'companyCreate' })
  async createCompany(
    @Context() context: MyContext,
    @Args('input') input: CreateCompanyInput,
  ): Promise<CompanyEntity> {
    try {
      const { user } = context.req;
      const company = await this.companiesService.create(input, user['id']);

      return company;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => CompanyEntity, { name: 'companyUpdate' })
  async updateCompany(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateCompanyInput,
  ): Promise<CompanyEntity> {
    try {
      const { user } = context.req;
      const company = await this.companiesService.update(
        id,
        { ...input },
        user['id'],
      );

      return company;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'companyDelete' })
  async deteleCompany(@Args('id') id: number): Promise<boolean> {
    await this.companiesService.remove(id);
    const company = await this.companiesService.findOneById(id);
    if (!company) {
      return true;
    }
    return false;
  }

  @ResolveField('state')
  async state(@Parent() company: CompanyEntity) {
    const id = company.stateId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('city')
  async city(@Parent() company: CompanyEntity) {
    const id = company.cityId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() company: CompanyEntity): Promise<any> {
    const id = company.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() company: CompanyEntity) {
    const id = company.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
