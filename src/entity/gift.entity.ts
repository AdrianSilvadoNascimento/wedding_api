import { GiftStatus } from '@prisma/client';

export class GiftEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
  store: string;
  status: GiftStatus;
  blocked_at?: Date | null;
  present_owner?: PresentOwnerEntity | null;
}

export class PresentOwnerEntity {
  id: string;
  name: string;
  notes: string;
  estimated_delivery: string;
  gift_id: string;
  created_at: Date;
  updated_at: Date;
}
