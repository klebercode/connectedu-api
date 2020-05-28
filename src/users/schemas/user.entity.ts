import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base-entity';

@Entity('users')
export class User extends BaseEntity {

    @Column()
    name:string;  

    @Column()
    email:string;  

    @Column()
    password:string;  

}

