import { ExpressContext } from "apollo-server-express";

interface TokenPayload {
  id: string;
  email: string;
  tokenVersion: number;
}

interface MyContext extends ExpressContext {
  payload?: TokenPayload;
}
