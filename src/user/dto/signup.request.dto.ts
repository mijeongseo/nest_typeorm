import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingupRequestDto {
  @IsEmail()
  @ApiProperty({
    example: 'test@naraspace.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public lastname: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  public status: boolean;
}
