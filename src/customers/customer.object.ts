import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['host'])
export class Customer {
  @PrimaryColumn()
  host: string;

  @Column()
  name: string;
}
