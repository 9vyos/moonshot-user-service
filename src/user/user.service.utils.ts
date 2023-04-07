import { UserRepository } from '../domain/user/user.repository';
import { NotFoundException } from '@nestjs/common';

export class UserServiceUtils {
  static async validateEmail(userRepository: UserRepository, email: string) {
    const user = await userRepository.findOneBy({ email });
    if (user != null) {
      throw new NotFoundException('이미 존재하는 이메일입니다.');
    }
  }
}
