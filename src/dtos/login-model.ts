import { IsNotEmpty } from 'class-validator';

export class LoginModel {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
