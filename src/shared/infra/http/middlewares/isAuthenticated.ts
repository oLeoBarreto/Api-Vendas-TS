import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secrect as Secret);

    const { sub } = decodeToken;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token!');
  }
}
