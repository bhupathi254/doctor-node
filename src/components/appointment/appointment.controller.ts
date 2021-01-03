import { Controller, Get, Post, Body, Put, Param, HttpCode, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto/create-appointment.dto';
import { PaginateDto } from './dto/paginate.dto';
import { IAppointment } from './entities/appointment.schema';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  async create(@Body() createAppointmentDto: AppointmentDto) {
    await this.appointmentService.create(createAppointmentDto as IAppointment);
    return { message: 'Created successfully' };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all appointments with pagination' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: PaginateDto) {
    try {
      return await this.appointmentService.findAll(query);
    } catch (error) {
      console.log(error)
      return {data: [], count:0};
    }
    
  }

  @Put(':id')
  update(@Param('id') _id: string, @Body('status') status) {
    return this.appointmentService.update(_id, status);
  }

}
