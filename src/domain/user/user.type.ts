import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

registerEnumType(UserType, {
  name: 'UserType',
});
