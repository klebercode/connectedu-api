import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BasicFields } from '../../common/types/basicfields';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserLog extends Document {
  @Prop()
  name: string;

  @Prop()
  bio: string;

  @Prop()
  website: string;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
