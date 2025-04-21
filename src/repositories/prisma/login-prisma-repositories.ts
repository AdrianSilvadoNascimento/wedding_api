import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { env } from 'process';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from '../../database/prisma.service';
import { LoginRepository } from '../login-repositories';
import { LoginModel } from 'src/dtos/login-model';
import { LoginEntity } from 'src/entity/login.entity';

export interface LoginResponse {
  token: string;
  expiresIn: number;
  userData: LoginEntity;
}

Injectable();
export class LoginPrismaRepository implements LoginRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createLogin(props: LoginModel): Promise<LoginEntity> {
    try {
      console.log('Chegou nesse método', props);

      const existUser = (await this.prismaService.login.findUnique({
        where: {
          email: props.email,
        },
      })) as LoginEntity | null;

      console.log('existUser', existUser);

      if (existUser) {
        throw new NotAcceptableException('Email já cadastrado!');
      }

      const salt = await bcrypt.genSalt(10);
      props.password = await bcrypt.hash(props.password, salt);

      const newUser = await this.prismaService.login.create({
        data: {
          email: props.email,
          password: props.password,
        },
      });

      console.log('newUser', newUser);

      const returnUser: LoginEntity = {
        email: newUser.email,
      };

      return returnUser;
    } catch (err) {
      throw new InternalServerErrorException('Error creating login');
    }
  }

  async login(props: LoginModel): Promise<LoginResponse> {
    try {
      const user: any = await this.prismaService.login.findUnique({
        where: {
          email: props.email,
        },
      });

      if (!user) {
        throw new NotAcceptableException(
          'Credenciais Inválidas! Favor, tentar novamente',
        );
      }

      const invalidPassword: boolean = await bcrypt.compare(
        props.password,
        user.password,
      );

      if (!invalidPassword) throw new NotAcceptableException('Senha inválida');

      const token = jwt.sign(
        {
          user: user.name,
          email: user.email,
          userId: user.id,
        },
        env.IDENTITY,
        {
          expiresIn: '1h',
        },
      );

      const userData: LoginEntity = user;

      return {
        token,
        expiresIn: 3600,
        userData,
      };
    } catch (err) {
      throw new InternalServerErrorException('Error logging in');
    }
  }
}
