import { Injectable } from '@nestjs/common';

import { LoginRepository } from '../../repositories/login-repositories';
import { LoginModel } from '../../dtos/login-model';
import { LoginResponse } from '../../repositories/prisma/login-prisma-repositories';

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}

  async login(credentials: LoginModel): Promise<LoginResponse> {
    return this.loginRepository.login(credentials);
  }
}
