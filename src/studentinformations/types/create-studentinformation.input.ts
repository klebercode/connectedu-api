import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreatStudentInformationInput {
  @Field({ nullable: true })
  @IsOptional()
  studentId?: number;

  @Field({ nullable: true })
  @IsOptional()
  yearId?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateRegistration?: Date;

  @Field({ nullable: true })
  @IsOptional()
  classroomId?: number;

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
  @IsOptional()
  formPayment?: number;

  @Field({ nullable: true })
  @IsOptional()
  monthlyDiscount?: number;

  @Field({ nullable: true })
  @IsOptional()
  dateExit?: Date;

  @Field({ nullable: true })
  @MaxLength(2)
  @IsOptional()
  reasonExit?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  descriptionReason?: string;

  @Field({ nullable: true })
  @IsOptional()
  responsible1Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  relationship1?: number;

  @Field({ nullable: true })
  @IsOptional()
  responsible2Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  relationship2?: number;

  @Field({ nullable: true })
  @IsOptional()
  responsiblePedagId?: number;

  @Field({ nullable: true })
  @IsOptional()
  relationshipPedag?: number;
}
