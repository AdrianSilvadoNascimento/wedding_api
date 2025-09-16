import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { GiftStatus } from '@prisma/client';

export class PresentOwnerModel {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Ação é obrigatória' })
  @IsIn(['RESERVED', 'SOLD'], { message: 'Ação deve ser RESERVED ou SOLD' })
  action: 'RESERVED' | 'SOLD';

  @IsOptional()
  notes?: string;

  @IsOptional()
  estimated_delivery?: string;
}

export class PresentOwnerResponse {
  id: string;
  name: string;
  notes: string;
  estimated_delivery: string;
  gift_id: string;
  created_at: Date;
  updated_at: Date;
}
