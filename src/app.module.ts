import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './components/appointment/appointment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/doctor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
