import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class MigrationsStudentInput {
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
  @IsOptional()
  stateNaturalness?: string;

  @Field({ nullable: true })
  @IsOptional()
  cityNaturalness?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  reside?: string;

  @Field({ nullable: true })
  @IsOptional()
  separatedParents?: string;

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
  state?: string;

  @Field({ nullable: true })
  @IsOptional()
  city?: string;

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
  @MaxLength(20)
  legacyCode: string;

  // MÃE
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  mother_name: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  mother_nationality?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  mother_dateBirth: Date;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  mother_gender?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  mother_adress?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  mother_district?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  mother_complement?: string;

  @Field({ nullable: true })
  @IsOptional()
  mother_state?: string;

  @Field({ nullable: true })
  @IsOptional()
  mother_city?: string;

  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  mother_zipCode?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  @IsEmail()
  mother_email?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  mother_phone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  mother_cellphone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  mother_whatsapp?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  mother_cpf?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  mother_identity?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  mother_OrgIdentity?: string;

  @Field({ nullable: true })
  @MaxLength(20)
  @IsOptional()
  mother_civilStatus?: string;

  @Field({ nullable: true })
  @MaxLength(40)
  @IsOptional()
  mother_profession?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  mother_workCompany?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  mother_workPhone?: string;

  //PAI
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  father_name: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  father_nationality?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  father_dateBirth: Date;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  father_gender?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  father_adress?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  father_district?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  father_complement?: string;

  @Field({ nullable: true })
  @IsOptional()
  father_state?: string;

  @Field({ nullable: true })
  @IsOptional()
  father_city?: string;

  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  father_zipCode?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  @IsEmail()
  father_email?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  father_phone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  father_cellphone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  father_whatsapp?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  father_cpf?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  father_identity?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  father_OrgIdentity?: string;

  @Field({ nullable: true })
  @MaxLength(20)
  @IsOptional()
  father_civilStatus?: string;

  @Field({ nullable: true })
  @MaxLength(40)
  @IsOptional()
  father_profession?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  father_workCompany?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  father_workPhone?: string;

  //RESPONSAVEL
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  respfin_name: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  respfin_nationality?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  respfin_dateBirth: Date;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  respfin_gender?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  respfin_adress?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  respfin_district?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  respfin_complement?: string;

  @Field({ nullable: true })
  @IsOptional()
  respfin_state?: string;

  @Field({ nullable: true })
  @IsOptional()
  respfin_city?: string;

  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  respfin_zipCode?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  @IsEmail()
  respfin_email?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  respfin_phone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  respfin_cellphone?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  respfin_whatsapp?: string;

  @Field({ nullable: true })
  @MaxLength(14)
  @IsOptional()
  respfin_cpf?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  respfin_identity?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  respfin_OrgIdentity?: string;

  @Field({ nullable: true })
  @MaxLength(20)
  @IsOptional()
  respfin_civilStatus?: string;

  @Field({ nullable: true })
  @MaxLength(40)
  @IsOptional()
  respfin_profession?: string;

  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  respfin_workCompany?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  respfin_workPhone?: string;

  // informações do aluno
  @Field({ nullable: true })
  @MaxLength(4)
  @IsOptional()
  year?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateRegistration: Date;

  @Field({ nullable: true })
  @MaxLength(20)
  @IsOptional()
  classroom_legacyCode?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  situation?: string;

  @Field({ nullable: true })
  @IsOptional()
  numberStudent?: number;

  @Field({ nullable: true })
  @IsOptional()
  payday?: number;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  formPayment?: string;

  @Field({ nullable: true })
  @IsOptional()
  monthlyDiscount?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateExit: Date;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  reasonExit?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  descriptionReason?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  responsiblePedag?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  newStudent?: string;
}
