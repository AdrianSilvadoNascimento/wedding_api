import { Injectable } from '@nestjs/common';

import { GiftModel } from '../../dtos/gift-model';
import { GiftEntity } from '../../entity/gift.entity';
import { GiftRepository } from '../../repositories/gift-repositories';

@Injectable()
export class GiftService {
  constructor(private readonly giftRepository: GiftRepository) {}

  async getAllGifts(): Promise<GiftEntity[]> {
    return this.giftRepository.getAllGifts();
  }

  async getGiftById(id: string): Promise<GiftEntity> {
    return this.giftRepository.getGiftById(id);
  }

  async createGift(giftModel: GiftModel): Promise<GiftEntity> {
    return this.giftRepository.createGift(giftModel);
  }

  async updateGift(id: string, giftModel: GiftModel): Promise<GiftEntity> {
    return this.giftRepository.updateGift(id, giftModel);
  }

  async deleteGift(id: string): Promise<GiftEntity[]> {
    return this.giftRepository.deleteGift(id);
  }
}
