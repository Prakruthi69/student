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
  Matches,
} from 'class-validator';
import { Department, StudentStatus } from './create-student.dto';

// All fields optional — only the fields sent will be updated.
// The global ValidationPipe (whitelist: true) strips any unrecognised keys.
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
  @IsEnum(Department, { message: `department must be one of: ${Object.values(Department).join(', ')}` })
  department?: Department;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  semester?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'GPA must be a numeric string e.g. "8.75"' })
  gpa?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(StudentStatus, { message: `status must be one of: ${Object.values(StudentStatus).join(', ')}` })
  status?: StudentStatus;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateOfBirth must be in YYYY-MM-DD format' })
  dateOfBirth?: string;
}
