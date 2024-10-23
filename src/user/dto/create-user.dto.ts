import {
    IsNotEmpty,
    IsString,
    IsNumber
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNumber()
    telegramId: number;
  
    @IsString()
    firstName: string;
  
    @IsString()
    userName: string;
  }