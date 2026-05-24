import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsNumberString,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Department, StudentStatus } from './create-student.dto';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  rollNumber?: string;

  @IsOptional()
  @IsEnum(Department, { message: 'Invalid department' })
  department?: Department;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  semester?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'GPA must be a number string like "8.75"' })
  gpa?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(StudentStatus, { message: 'Invalid status' })
  status?: StudentStatus;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;
}
