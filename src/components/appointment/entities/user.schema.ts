import * as mongoose from "mongoose";
export interface IUser extends mongoose.Document {
  name: string;
  mobile: number;
  address: string;
  dob: Date;
  gender: 'male' | 'female';
  status: 'ACTIVE' | 'INACTIVE';
}

export const User: mongoose.Schema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  dob: Date,
  address: String,
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, { collection: 'user', timestamps: true });
