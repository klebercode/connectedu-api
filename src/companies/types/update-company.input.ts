import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class UpdateCompanyInput {
  @Field({ nullable: true })
  @IsOptional()
  id: number;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  socialReason: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  nameFantasy: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  adress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(60)
  district?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(60)
  complement?: string;

  @Field({ nullable: true })
  @IsOptional()
  stateId?: number;

  @Field({ nullable: true })
  @IsOptional()
  cityId?: number;

  // campo CEP
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(10)
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  cellphone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  whatsapp?: string;

  @Field({ nullable: true })
  @MaxLength(18)
  @IsOptional()
  cnpj?: string;

  @Field({ nullable: true })
  @MaxLength(18)
  @IsOptional()
  stateRegistration?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  recognition?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  publication?: string;

  @Field({ nullable: true })
  @MaxLength(40)
  @IsOptional()
  registerSchool?: string;

  @Field({ nullable: true })
  @MaxLength(40)
  @IsOptional()
  numberInep?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  principal?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  secretary?: string;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  image?: string;
}
