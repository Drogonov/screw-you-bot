import {
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator';

export class AuthUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  // @IsString()
  // @IsNotEmpty()
  // password: string;
}