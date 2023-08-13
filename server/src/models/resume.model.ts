

import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeData extends Document {
  name: string;
  email: string[];
  phone: string;
  location: string[];
  position: string[];
  skills: string[];
  language: string[];
  experience: number;
  resume_pdf_url: string;
  is_profile_match : boolean;
  role_id : Schema.Types.ObjectId;
  match_percentage : number

}

const ResumeData : Schema = new Schema<IResumeData>({
  name: { type: String },
  email: [{ type: String, required: true }],
  phone: { type: String, required: false },
  location: [{ type: String, required: true }],
  position: [{ type: String, required: true }],
  skills: [{ type: String  }],
  language: [{ type: String }],
  experience: { type: Number, required: true },
  resume_pdf_url: { type: String, required: true },
  role_id : { type : Schema.Types.ObjectId , required : true , ref : '' },
  is_profile_match : {type : Boolean} ,
  match_percentage : {type : Number}

}, {versionKey : false});

export default mongoose.model<IResumeData>('ResumeData', ResumeData);
