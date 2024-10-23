import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class CreateMessageDto {
    @IsString()
    senderId: number;
  
    @IsString()
    receiverId: number;
  
    @IsString()
    text: string;
  }