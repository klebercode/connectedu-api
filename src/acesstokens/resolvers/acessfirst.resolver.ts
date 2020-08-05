import { UseFilters } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { AcessTokenEntity } from '../entities/acesstokens.object';
import { AcessTokensService } from '../acesstokens.service';
import { AcessFirstObject } from '../types/acessfirst.object';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

import { CustomException } from '../../common/filters/http-exception.filter';

@Resolver(of => AcessFirstObject)
@UseFilters(HttpExceptionFilter)
export class AcessFirstResolver {
  constructor(private readonly userTokensService: AcessTokensService) {}

  @Query(() => AcessFirstObject, { name: 'acessTokenFirst' })
  async get(@Args('token') token: string): Promise<AcessFirstObject> {
    try {
      return await this.userTokensService.acessToken(token);
    } catch (error) {
      CustomException.catch(error, 'get', 'Primeiro Acesso Token App');
    }
  }
}
