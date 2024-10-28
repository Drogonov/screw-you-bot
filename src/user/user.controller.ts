import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { AuthUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }
}
