import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  useNickName: boolean;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  nickName: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateBirth: Date;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  gender?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  codeNationality?: string;

  @Field({ nullable: true })
  @IsOptional()
  stateNaturalnessId?: number;

  @Field({ nullable: true })
  @IsOptional()
  cityNaturalnessId?: number;

  @Field({ nullable: true })
  @MaxLength(30)
  @IsOptional()
  stateNaturalnessForeign?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  @IsOptional()
  naturalnessForeign?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  @IsOptional()
  nationalityForeign?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  reside?: string;

  @Field({ nullable: true })
  @IsOptional()
  separatedParents?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  resideResponsableId?: number;

  @Field({ nullable: true })
  @IsOptional()
  fatherId?: number;

  @Field({ nullable: true })
  @IsOptional()
  motherId?: number;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  adress?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  district?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  complement?: string;

  @Field({ nullable: true })
  @IsOptional()
  stateId?: number;

  @Field({ nullable: true })
  @IsOptional()
  cityId?: number;

  // campo CEP
  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  zipCode?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  schoolLast?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  @IsEmail()
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
  @MaxLength(14)
  @IsOptional()
  cpf?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  identity?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  OrgIdentity?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  registryName?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  certificateNumber?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  bookNumber?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  bookSheet?: string;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  profile?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
