import { registerEnumType } from '@nestjs/graphql';

export enum TypeUser {
  S = 'S', //Student
  R = 'R', //Responsabel
  T = 'T', //Teacher
  E = 'E', //Employe
  I = 'I', //Intern
}
registerEnumType(TypeUser, { name: 'TypeUser' });

export enum Relationship {
  P = 'Pai',
  M = 'Mãe',
  T = 'Tio/Tia',
  V = 'Avó/Avô',
  R = 'Primo/Prima',
  I = 'Irmão/Irmã',
  O = 'Outros',
}
registerEnumType(Relationship, { name: 'Relationship' });
