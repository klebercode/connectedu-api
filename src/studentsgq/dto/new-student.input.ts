import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewStudentInput {
  @Field()
  @MaxLength(100)
  @Field({ nullable: false })
  name: string;

  @Field()
  @IsOptional()
  @MaxLength(100)
  @Field({ nullable: true })
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