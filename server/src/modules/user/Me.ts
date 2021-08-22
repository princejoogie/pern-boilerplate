import { AuthenticationError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";

@Resolver()
export class MeResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext): Promise<string> {
    return payload.id;
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async profile(@Ctx() { payload }: MyContext): Promise<User> {
    const user = User.findOne({ where: { id: payload.id } });
    if (!user) throw new Error("Cannot find user");
    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async revokeRefreshToken(
    @Arg("userId", () => String) userId: string,
    @Ctx() { payload }: MyContext
  ) {
    if (payload.id !== userId) {
      throw new AuthenticationError("Not authenticated");
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new AuthenticationError("User does not exist");
    }

    user.tokenVersion += 1;
    await user.save();

    return true;
  }
}
