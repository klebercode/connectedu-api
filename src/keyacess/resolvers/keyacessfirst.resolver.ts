import { UseFilters } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { KeyAcessService } from '../keyacess.service';
import { KeyAcessFirstObject } from '../types/keyacessfirst.object';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

import { CustomException } from '../../common/filters/http-exception.filter';

@Resolver(of => KeyAcessFirstObject)
@UseFilters(HttpExceptionFilter)
export class KeyAcessFirstResolver {
  constructor(private readonly keyAcessService: KeyAcessService) {}

  @Query(() => KeyAcessFirstObject, { name: 'keyAcessFirst' })
  async get(@Args('key') key: string): Promise<KeyAcessFirstObject> {
    try {
      return await this.keyAcessService.FindKeyAcess(key);
    } catch (error) {
      CustomException.catch(error, 'get', 'Chave de Primeiro Acesso App');
    }
  }
}
