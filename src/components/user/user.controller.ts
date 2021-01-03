import { Get, HttpCode, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppointmentService } from '../appointment/appointment.service';
import { PaginateDto } from '../appointment/dto/paginate.dto';
import { UserDto } from '../appointment/dto/user.dto';
import { IUser } from '../appointment/entities/user.schema';

@Controller('user')
export class UserController {
    constructor(private readonly appointmentService: AppointmentService) { }
    @Post()
    async create(@Body() userDto: UserDto) {
        const user = { ...userDto };
        await this.appointmentService.createUser(user as unknown as IUser);
        return { message: 'Created successfully' };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all users with pagination' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@Query() query: PaginateDto) {
        return await this.appointmentService.findAllUser(query);
    }
}
