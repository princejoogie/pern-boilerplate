import { Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}
