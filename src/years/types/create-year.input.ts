import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateYearInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(4)
  year?: string;

  @Field({ nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateEnd?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateModule1?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateModule2?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateModule3?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateModule4?: Date;
}
