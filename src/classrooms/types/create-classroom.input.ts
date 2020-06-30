import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateClassRoomInput {
  @Field({ nullable: true })
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  abbreviation?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  descriptionMinutes?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  shift?: string;

  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  type?: string;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  level?: string;

  @Field({ nullable: true })
  @MaxLength(2)
  @IsOptional()
  classification?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  companyId?: number;

  @Field({ nullable: true })
  @IsOptional()
  yearId?: number;
}
