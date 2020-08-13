import { ID, Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { Paginated } from '../../common/pages';
import { BasicFields } from '../../common/types/basicfields';
import { TypeUser } from '../../common/enums/enum-usertoken';
import { UserTypeEntity } from '../../usertypes/types/usertypes.object';

@ObjectType()
@Entity('usercenter')
@Unique(['login'])
@Unique(['token'])
@Unique(['keyAcessFirst'])
export class UserCenterEntity extends BasicFields {
  @Field({ nullable: false })
  @IsOptional()
  @Column({ name: 'id_user', nullable: false })
  idUser: number;

  @Field(type => TypeUser, { nullable: false })
  @Column({ name: 'user_type', nullable: false })
  @IsOptional()
  userType?: TypeUser;

  @Field({ nullable: true })
  @IsOptional()
  @Column({ type: 'varchar', length: 40, nullable: true })
  login: string;

  @Field({ nullable: true })
  @IsOptional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Field({ nullable: false })
  @IsOptional()
  @Column({ name: 'status_active_web', nullable: false })
  statusActiveWeb: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @Column({ type: 'varchar', length: 40, nullable: true })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @Column({ name: 'token', type: 'varchar', length: 20, nullable: true })
  token: string;

  @Field({ nullable: false })
  @IsOptional()
  @Column({ name: 'status_active_App', nullable: false })
  statusActiveApp: boolean;

  @Field({ nullable: false })
  @IsOptional()
  @Column({ name: 'status', nullable: false })
  status: boolean;

  // chave de acesso usada para primeiro acesso
  @Field({ nullable: false })
  @IsOptional()
  @Column({
    name: 'key_acess_first',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  keyAcessFirst: string;

  @Field(type => UserTypeEntity, { nullable: false })
  @IsOptional()
  temp?: UserTypeEntity;
}

@ObjectType()
export class UserCenterPaginated extends Paginated<UserCenterEntity>(
  UserCenterEntity,
) {}
