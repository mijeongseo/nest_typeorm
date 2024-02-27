import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SingupRequestDto } from './dto/signup.request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get('/:userId')
  async getUser(@Param('userId') userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signup(@Body() data: SingupRequestDto) {
    const result = await this.userService.signup(data);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
