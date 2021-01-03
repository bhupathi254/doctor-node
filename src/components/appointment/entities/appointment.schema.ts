import * as mongoose from "mongoose";
import { IUser } from "./user.schema";
export interface IAppointment extends mongoose.Document {
  appointmentTime: Date;
  userId: IUser['_id'];
}

export const Appointment: mongoose.Schema = new mongoose.Schema({
  appointmentTime: Date,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted'],
    default: 'Pending'
  },
},{ collection: 'appointment', timestamps: true });
