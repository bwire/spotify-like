import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('users')
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
