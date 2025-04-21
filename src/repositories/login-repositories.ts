import { Injectable } from '@nestjs/common';

import { LoginModel } from '../dtos/login-model';
import { LoginEntity } from '../entity/login.entity';
import { LoginResponse } from './prisma/login-prisma-repositories';

export abstract class LoginRepository {
  abstract login(props: LoginModel): Promise<LoginResponse>;
}
