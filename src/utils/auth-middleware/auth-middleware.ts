/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { env } from 'process';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const tokenJWT = token.substring(7);

    try {
      const decoded: any = jwt.verify(tokenJWT, env.IDENTITY);

      req['user'] = decoded;
      next();
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
