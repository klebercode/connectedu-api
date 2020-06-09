import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewGroup {
  @Field({ nullable: false })
  @MaxLength(100)
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  tipo?: boolean;

  @Field({ name: 'dateBegin', nullable: true })
  @IsOptional()
  date_begin?: Date;

  @Field({ name: 'dateEnd', nullable: true })
  @IsOptional()
  date_end?: Date;
}
