import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { LoginUserDto } from './dto/login-user.dto copy';

@Injectable()
export class UserService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async create(createUserDto: CreateUserDto) {
    const users: User[] = await this.dbService.read<User>();
    const foundUser = users.find(
      (item) => item.username === createUserDto.username,
    );
    if (foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.createdAt = new Date().getTime();
    users.push(user);
    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read<User>();
    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );
    if (!foundUser) {
      throw new BadRequestException('该用户尚未注册');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('账户或密码错误');
    }

    return foundUser;
  }
}
