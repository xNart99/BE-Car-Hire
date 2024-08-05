import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/details/:id')
  getUserDetail(@Param('id') id: string) {
    return this.userService.getUserDetail(id);
  }
  @Post('/register')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('/login')
  loginUser(@Body() user: LoginUserDto) {
    return this.userService.login(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    return this.userService.updateUser(id, user);
  }
}
