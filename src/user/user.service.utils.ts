import { UserRepository } from '../domain/user/user.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserServiceUtils {
  static async validateEmail(userRepository: UserRepository, email: string) {
    const user = await userRepository.findOneBy({ email });
    if (user != null) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }
  }

  static async findUserByEmail(userRepository: UserRepository, email: string) {
    const user = await userRepository.findOneBy({ email });
    if (user == null) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }
    return user;
  }

  static async findUserById(userRepository: UserRepository, id: number) {
    const user = await userRepository.findOneBy({ id });
    if (user == null) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return user;
  }
}
