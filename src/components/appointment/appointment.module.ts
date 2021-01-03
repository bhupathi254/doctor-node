import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment.schema';
import { UserController } from '../user/user.controller';
import { User } from './entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Appointment', schema: Appointment }, { name: 'User', schema: User }]),
  ],
  controllers: [AppointmentController, UserController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
