import { CustomRepository } from '../../config/database/typeorm-ex.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
