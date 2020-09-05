import { Args, Query, Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseFilters, HttpException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

@Resolver()
@UseFilters(HttpExceptionFilter)
export class LoginResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'superUser' })
  superUser(
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<String> {
    const token = this.authService.superUser(login, password);
    return token;
  }

  @Query(() => String, { name: 'userLogin' })
  userLogin(
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<String> {
    const token = this.authService.userLogin(login, password);
    return token;
  }

  @Query(() => String, { name: 'keyAccessFirst' })
  async getKeyAccess(
    @Args('key') key: string,
    @Args('originApp') originApp: boolean,
  ): Promise<string> {
    try {
      return await this.authService.FirstAccess(key, originApp);
    } catch (error) {
      throw new HttpException('Erro Rotina FirstAcess', error);
    }
  }
}
