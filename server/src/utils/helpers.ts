import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";
import { Response } from "express";
import { __REFRESH_COOKIE_NAME } from "../constants";

export function getAccessTokenSecret() {
  return process.env.ACCESS_TOKEN_SECRET;
}

export function getRefreshTokenSecret() {
  return process.env.REFRESH_TOKEN_SECRET;
}

export function generateAccessToken(user: User) {
  const payload: TokenPayload = {
    email: user.email,
    id: user.id,
    tokenVersion: user.tokenVersion,
  };
  const options: jwt.SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, getAccessTokenSecret(), options);
}

export function generateRefreshToken(user: User) {
  const payload: TokenPayload = {
    email: user.email,
    id: user.id,
    tokenVersion: user.tokenVersion,
  };
  const options: jwt.SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, getRefreshTokenSecret(), options);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  const payload = jwt.verify(token, getAccessTokenSecret()) as TokenPayload;
  return payload;
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  const payload = jwt.verify(token, getRefreshTokenSecret()) as TokenPayload;
  return payload;
}

export function setRefreshToken(res: Response, token) {
  res.cookie(__REFRESH_COOKIE_NAME, token, { httpOnly: true });
}
