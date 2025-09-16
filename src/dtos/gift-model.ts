import { IsNotEmpty } from 'class-validator';

export class GiftModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  description: string;
  store: string;
  link: string;

  image: string;
}

export class GiftUpdateModel {
  name?: string;
  price?: number;
  description?: string;
  store?: string;
  link?: string;
  image?: string;
}
