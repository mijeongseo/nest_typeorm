import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '@entities/user.entity';

import { SingupRequestDto } from './dto/signup.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email'],
    });
  }

  async findByNickname(nickname: string) {
    return this.userRepository.findOne({
      where: { nickname },
    });
  }

  async signup(data: SingupRequestDto) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('email = :email OR nickname = :nickname', {
        email: data.email,
        nickname: data.nickname,
      })
      .getOne();
    if (user) throw new ForbiddenException('이미 가입된 이메일/닉네임 입니다.');

    const newUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
    console.log(newUser);
    return data;
  }
}
