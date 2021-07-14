import { Repository } from "typeorm"
import { User } from "../entities/User"
import { getConnection } from "typeorm"

export class UserRepository extends Repository<User> {}
