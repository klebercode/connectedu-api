import * as mongoose from 'mongoose';

export const UserLogSchema = new mongoose.Schema({
  table: String,
  idregister: Number,
  iduser: Number,
  usertype: String,
  operation: String,
  description: Array,
  created_at: { type: Date, default: Date.now },
});
