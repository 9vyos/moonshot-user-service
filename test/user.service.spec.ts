import { UserService } from '../src/user/user.service';
import { UserRepository } from '../src/domain/user/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/domain/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../src/config/auth/constants';
import { ConfigModule } from '@nestjs/config';
import { UserType } from '../src/domain/user/user.type';
import { NotFoundException } from '@nestjs/common';

class MockUserRepository {
  myData = [
    {
      id: 1,
      email: 'test@naver.com',
      password: '1234',
      name: 'test',
      userType: UserType.GUEST,
    },
  ];

  findOneBy(where) {
    if (where.email !== null) {
      const result = this.myData.find((user) => user.email === where.email);
      return result === undefined ? null : result;
    }
    if (where.id !== null) {
      const result = this.myData.find((user) => user.id === where.id);
      return result === undefined ? null : result;
    }
  }

  save(user: User) {
    const testUser = {
      id: 2,
      email: user.email,
      password: user.password,
      name: user.name,
      userType: user.userType,
    };
    this.myData.push(testUser);
    return testUser;
  }
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot({
          type: 'mariadb',
          host: process.env.DB_HOST,
          port: 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [__dirname + '/../src/domain/**/*.entity.{js,ts}'],
          synchronize: true,
          logging: true,
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [
        UserService,
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  // queryRunner 있을 때 mock 처리를 해줘야함
  // it('새로운 유저 signup', async () => {
  //   try {
  //     const request = CreateUserRequest.testInstance('test2@naver.com', 'test');
  //     const userInfoResponse = await userService.signup(request);
  //     expect(userInfoResponse).toEqual({
  //       id: 2,
  //       email: request.email,
  //       name: request.name,
  //       userType: request.userType,
  //     });
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(BadRequestException);
  //   }
  // });
  //
  // it('이미 있는 signup', async () => {
  //   try {
  //     const request = CreateUserRequest.testInstance('test@naver.com', 'test');
  //     const userInfoResponse = await userService.signup(request);
  //     expect(userInfoResponse).toEqual({
  //       id: 2,
  //       email: request.email,
  //       name: request.name,
  //     });
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(BadRequestException);
  //   }
  // });

  it('1번 유저가 있을 때 getUser 성공', async () => {
    try {
      const userInfoResponse = await userService.getUser(1);
      expect(userInfoResponse).toEqual({
        id: 1,
        email: 'test@naver.com',
        name: 'test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('2번 유저가 없는데 getUser하게 되면 실패', async () => {
    try {
      const userInfoResponse = await userService.getUser(2);
      expect(userInfoResponse).toEqual({
        id: 1,
        email: 'test@naver.com',
        name: 'test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
