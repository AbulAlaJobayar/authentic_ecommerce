import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

type ExpiresIn = SignOptions['expiresIn']; // Correct type expected

const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: ExpiresIn
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token: string, secret: Secret): string | JwtPayload => {
  return jwt.verify(token, secret);
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
