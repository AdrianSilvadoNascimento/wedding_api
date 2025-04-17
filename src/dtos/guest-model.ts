import { IsNotEmpty } from 'class-validator';

export class GuestModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  is_by_hellen: boolean;
}
