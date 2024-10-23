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

  // @Post('create')
  // create(@Body() dto: AuthUserDto) {
  //   console.log(dto)
  //   return this.userService.createUser(dto);
  // }

  // @Post('edit')
  // edit(@Body() dto: EditUserDto) {
  //   console.log(dto)
  //   return this.userService.editUser(dto);
  // }
}
