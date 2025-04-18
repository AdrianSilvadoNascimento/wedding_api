import { IsNotEmpty } from 'class-validator';

export class GiftModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  description: string;

  image: string;
}
