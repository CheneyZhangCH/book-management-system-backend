/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username 不能为空' })
  username: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(6, { message: 'password 至少6位' })
  password: string;
}
