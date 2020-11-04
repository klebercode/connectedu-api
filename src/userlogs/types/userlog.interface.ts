import { Document } from 'mongoose';

export interface UserLog extends Document {
  readonly table: string;
  readonly idregister: number;
  readonly iduser: number;
  readonly usertype: string;
  readonly operation: string;
  readonly description: string;
  readonly created_at: Date;
}
