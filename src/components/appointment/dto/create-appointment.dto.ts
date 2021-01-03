import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AppointmentDto {
    @ApiProperty()
    @IsNotEmpty()
    appointmentTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;
}
