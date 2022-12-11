import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
