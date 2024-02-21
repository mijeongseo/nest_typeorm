import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingupRequestDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsBoolean()
  @IsNotEmpty()
  public status: boolean;
}
