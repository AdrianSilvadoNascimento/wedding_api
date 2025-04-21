import { Body, Controller, Post } from '@nestjs/common';

import { LoginService } from '../../services/login/login.service';
import { LoginModel } from '../../dtos/login-model';
import { LoginResponse } from '../../repositories/prisma/login-prisma-repositories';

@Controller('admin')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  async login(@Body() loginModel: LoginModel): Promise<LoginResponse> {
    return await this.loginService.login(loginModel);
  }
}
