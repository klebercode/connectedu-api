import { applyDecorators, Injectable, Scope } from '@nestjs/common';

export const CustomersService = () =>
  applyDecorators(Injectable({ scope: Scope.REQUEST }));
