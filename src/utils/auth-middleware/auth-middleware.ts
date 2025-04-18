/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { env } from 'process';

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

    try {
      const req_token = token.split(' ')[1];

      if (req_token == env.IDENTITY) {
        req['user'] = req_token;
        next();
      }
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
