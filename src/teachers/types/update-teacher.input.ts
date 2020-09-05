import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class UpdateTeacherInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @MaxLength(40)
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
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  profile?: string;
}
