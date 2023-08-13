

import mongoose, { Schema, Document } from 'mongoose';

export interface IJobRole extends Document {
  position: string;
  skills: string[];
  experience: number;
  location: string;
  create_at : Date
}

const JobRole : Schema = new Schema<IJobRole>({
  position: { type: String, required: true },
  skills: [{ type: String }],
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  create_at: { type: Date, default: Date.now }
} , {versionKey : false});

export default mongoose.model<IJobRole>('JobRole', JobRole);