import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { LoginInput } from "./validators/LoginInput";
import { AuthenticationError } from "apollo-server-express";
import { AuthResponse } from "./AuthResponse";
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshToken,
} from "../../utils/helpers";
import { __REFRESH_COOKIE_NAME } from "../../constants";
import { MyContext } from "../../types";
import argon from "argon2";
@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Arg("data", () => LoginInput) { email, password }: LoginInput,
    @Ctx() { res }: MyContext
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError("Cannot find user");
    }

    const verified = await argon.verify(user.password, password);

    if (!verified) {
      throw new AuthenticationError("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setRefreshToken(res, refreshToken);

    return {
      accessToken,
    };
  }
}
