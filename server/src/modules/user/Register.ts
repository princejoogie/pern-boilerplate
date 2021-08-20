import { Arg, Mutation, Resolver } from "type-graphql";
import argon from "argon2";
import { User } from "../../entity/User";
import { RegisterInput } from "./validators/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("data", () => RegisterInput)
    { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await argon.hash(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    }).save();

    return user;
  }
}
