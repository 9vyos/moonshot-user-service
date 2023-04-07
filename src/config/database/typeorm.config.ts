import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '111111',
  database: 'moonshot',
  entities: [__dirname + '/../../**/**/*.entity.{js,ts}'],
  synchronize: true,
};
