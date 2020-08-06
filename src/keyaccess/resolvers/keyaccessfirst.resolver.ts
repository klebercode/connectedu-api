import { UseFilters } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { KeyAccessService } from '../keyaccess.service';
import { KeyAccessFirstObject } from '../types/keyaccessfirst.object';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

import { CustomException } from '../../common/filters/http-exception.filter';

@Resolver(of => KeyAccessFirstObject)
@UseFilters(HttpExceptionFilter)
export class KeyAccessFirstResolver {
  constructor(private readonly keyAccessService: KeyAccessService) {}

  @Query(() => KeyAccessFirstObject, { name: 'keyAccessFirst' })
  async get(@Args('key') key: string): Promise<KeyAccessFirstObject> {
    try {
      return await this.keyAccessService.FindKeyAccess(key);
    } catch (error) {
      CustomException.catch(error, 'get', 'Chave de Primeiro Acesso App');
    }
  }
}
