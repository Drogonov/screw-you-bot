import {
  IsOptional,
  IsString,
  IsNumber
} from 'class-validator';

export class EditUserDto {
  @IsNumber()
  @IsOptional()
  telegramId?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  userName?: string;
}