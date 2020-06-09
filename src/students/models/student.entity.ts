import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { User } from '../../users/models/user.entity';

@Entity('student')
export class Student extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cidade: string;

  @Column({ nullable: true })
  usercreatedId: number;

  @Column({ nullable: true })
  userupdatedId: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'usercreatedId' })
  usercreated: User;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userupdatedId' })
  userupdated: User;
}
