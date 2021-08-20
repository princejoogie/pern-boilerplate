import { AuthenticationError } from "apollo-server-express";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { MyContext, TokenPayload } from "../types";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export const isAuth: Middleware<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  const errorMessage = "Not authenticated";

  if (!authorization) {
    throw new AuthenticationError(errorMessage);
  }

  try {
    const token = authorization.split(" ")[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, secret) as TokenPayload;

    const user = await User.findOne({ where: { id: payload.id } });

    if (!user || payload.tokenVersion !== user.tokenVersion) {
      throw new AuthenticationError(errorMessage);
    }

    context.payload = payload;
  } catch (err) {
    throw new AuthenticationError(errorMessage);
  }

  return next();
};
