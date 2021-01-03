import { Type } from 'class-transformer';
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, Min, Max } from "class-validator";

export type Gender = 'male' | 'female';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type SortByValues = 'DESC' | 'ASC';
export class PaginateDto {
    @ApiPropertyOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1;
  
    @ApiPropertyOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    readonly limit: number = 10;
  
    @ApiPropertyOptional()
    readonly search: string = '';
  
    @ApiPropertyOptional()
    readonly sortWith: string;
  
    @ApiPropertyOptional({
      enum: ['ASC', 'DESC'],
    })
    readonly sortBy: SortByValues;

    @ApiPropertyOptional()
    readonly appointmentTime?: Date
  }