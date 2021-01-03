import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Gender, UserStatus } from "./paginate.dto";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    mobile: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    dob: Date;

    @ApiProperty()
    @IsNotEmpty()
    gender: Gender;
}