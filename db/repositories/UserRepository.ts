import { Repository } from "typeorm"
import { User } from "../entities/User"

export class UserRepository extends Repository<User> {
    // test
    getFirstUser() {
        return this.createQueryBuilder("user").getOne()
    }
}
