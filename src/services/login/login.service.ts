import { Injectable } from '@nestjs/common';

import { LoginRepository } from '../../repositories/login-repositories';
import { LoginModel } from '../../dtos/login-model';
import { LoginEntity } from '../../entity/login.entity';
import { LoginResponse } from '../../repositories/prisma/login-prisma-repositories';

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}

  async login(credentials: LoginModel): Promise<LoginResponse> {
    return this.loginRepository.login(credentials);
  }

  async createLogin(credentials: LoginModel): Promise<LoginEntity> {
    return this.loginRepository.createLogin(credentials);
  }
}
