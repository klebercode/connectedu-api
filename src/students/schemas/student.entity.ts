import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base-entity';

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

    @Column({ type: 'varchar', length: 100, nullable: true })
    image: string;
}

