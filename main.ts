import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsNumberString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export enum Department {
  COMPUTER_SCIENCE = 'computer_science',
  MATHEMATICS      = 'mathematics',
  PHYSICS          = 'physics',
  CHEMISTRY        = 'chemistry',
  BIOLOGY          = 'biology',
  ENGLISH          = 'english',
  HISTORY          = 'history',
  ECONOMICS        = 'economics',
  OTHER            = 'other',
}

export enum StudentStatus {
  ACTIVE    = 'active',
  INACTIVE  = 'inactive',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended',
}

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(255)
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsNotEmpty({ message: 'Roll number is required' })
  @MaxLength(50)
  rollNumber: string;

  @IsEnum(Department, { message: `department must be one of: ${Object.values(Department).join(', ')}` })
  @IsNotEmpty({ message: 'Department is required' })
  department: Department;

  @IsInt()
  @Min(1, { message: 'Semester must be at least 1' })
  @Max(8, { message: 'Semester cannot exceed 8' })
  semester: number;

  @IsOptional()
  // Accepts "8.75", "10.00", "9.5" etc.
  @IsNumberString({}, { message: 'GPA must be a numeric string e.g. "8.75"' })
  gpa?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(StudentStatus, { message: `status must be one of: ${Object.values(StudentStatus).join(', ')}` })
  status?: StudentStatus;

  @IsOptional()
  @IsString()
  // Enforce YYYY-MM-DD shape at the DTO level
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateOfBirth must be in YYYY-MM-DD format' })
  dateOfBirth?: string;
}
