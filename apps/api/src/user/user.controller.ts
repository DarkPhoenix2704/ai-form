import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@AuthUser() user: User) {
    return this.userService.findUserById(user.uid);
  }

  @Patch('/')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: User,
  ) {
    return this.userService.updateUser(user, updateUserDto);
  }

}
