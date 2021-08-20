import "reflect-metadata";
import { __prod, __REFRESH_COOKIE_NAME } from "./constants";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

// Resolvers
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { UsersResolver } from "./modules/user/Users";

// Helpers
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshToken,
  verifyRefreshToken,
} from "./utils/helpers";
import { User } from "./entity/User";

dotenv.config({
  path: __prod ? ".env" : ".env.development",
});

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver, UsersResolver],
  });
  const PORT = process.env.PORT || 4000;
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.get("/", (_, res) => {
    const filePath = path.join(__dirname, "/public/index.html");
    return res.sendFile(filePath);
  });

  app.post("/refresh-token", async (req, res) => {
    const token = req.cookies[__REFRESH_COOKIE_NAME];

    if (!token) res.send({ accessToken: null });

    try {
      const payload = await verifyRefreshToken(token);
      const user = await User.findOne({ where: { id: payload.id } });

      if (!user || user.tokenVersion !== payload.tokenVersion) {
        return res.send({ accessToken: null });
      }

      setRefreshToken(res, generateRefreshToken(user));
      return res.send({ accessToken: generateAccessToken(user) });
    } catch {
      return res.send({ accessToken: null });
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(PORT, async () => {
    const _baseUrl = process.env.BASE_URL || "http://localhost";
    const _launchUrl = `${_baseUrl}:${PORT}/graphql`;
    console.log(`server started at ${_launchUrl}`);
  });
}

main().catch((err) => {
  console.error(err);
});
