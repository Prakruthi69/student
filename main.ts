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

  @IsEnum(Department, { message: 'Invalid department' })
  @IsNotEmpty({ message: 'Department is required' })
  department: Department;

  @IsInt()
  @Min(1, { message: 'Semester must be at least 1' })
  @Max(8, { message: 'Semester cannot exceed 8' })
  semester: number;

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
  @IsString()
  @MinLength(10, { message: 'Date of birth must be in YYYY-MM-DD format' })
  dateOfBirth?: string;
}
