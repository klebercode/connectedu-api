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

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => CompanyEntity)
@UseFilters(HttpExceptionFilter)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}
  private nameApp = 'Empresa';

  @Query(() => CompanyEntity, { name: 'company' })
  async getCompany(@Args('id') id: number): Promise<CompanyEntity> {
    try {
      const obj = await this.companiesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [CompanyEntity], { name: 'companyAll' })
  async getCompanies(): Promise<CompanyEntity[]> {
    try {
      return this.companiesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'companyDelete' })
  async deteleCompany(@Args('id') id: number): Promise<boolean> {
    try {
      await this.companiesService.remove(id);
      const obj = await this.companiesService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => CompanyEntity, { name: 'companyUpdate' })
  async updateCompany(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateCompanyInput,
  ): Promise<CompanyEntity> {
    try {
      const { user } = context.req;
      const company = await this.companiesService.update(
        id,
        { ...input },
        user['id'],
      );

      return company;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
