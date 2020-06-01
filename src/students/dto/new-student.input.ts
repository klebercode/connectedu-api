import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewStudentInput {
  @Field({ nullable: false })
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  endereco?: string;

  @Field({ nullable: true })
  @MaxLength(50)
  @IsOptional()
  bairro?: string;

  @Field({ nullable: true })
  @MaxLength(50)
  @IsOptional()
  cidade?: string;
}
