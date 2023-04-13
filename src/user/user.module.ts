import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { jwtConstants } from '../config/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
