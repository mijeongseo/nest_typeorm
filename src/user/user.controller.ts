import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SingupRequestDto } from './dto/signup.request.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Version('2')
  @Get('/:userId')
  async getUser(@Param('userId') userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('signup')
  async signup(@Body() data: SingupRequestDto) {
    const result = await this.userService.signup(data);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
