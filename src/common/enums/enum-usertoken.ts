import { registerEnumType } from '@nestjs/graphql';

export enum TypeUser {
  S = 'S', //Student
  R = 'R', //Responsabel
  T = 'T', //Teacher
  E = 'E', //Employe
  I = 'I', //Intern
}
registerEnumType(TypeUser, { name: 'TypeOwer' });
