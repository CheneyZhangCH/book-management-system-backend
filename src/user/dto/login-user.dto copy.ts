/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'username 不能为空' })
  username: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;
}
