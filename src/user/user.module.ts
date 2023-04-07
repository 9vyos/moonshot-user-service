import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER-SERVICE',
      },
    ]),
  ],
  providers: [UserResolver],
})
export class UserModule {}
