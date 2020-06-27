import { applyDecorators, Injectable, Scope } from '@nestjs/common';

export const CustomersServiceDecorator = () =>
  applyDecorators(Injectable({ scope: Scope.REQUEST }));
