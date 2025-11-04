import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "100s" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
