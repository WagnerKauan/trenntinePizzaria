"use server";

import jwt from "jsonwebtoken";

export async function createToken(userId: string) {
  const SECRET_KEY = process.env.JWT_SECRET as string;

  return jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "1d",
  });
}