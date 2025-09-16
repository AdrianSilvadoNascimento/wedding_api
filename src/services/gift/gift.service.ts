import { Injectable } from '@nestjs/common';

import { GiftStatus } from '@prisma/client';

import { GiftModel, GiftUpdateModel } from '../../dtos/gift-model';
import { GiftEntity } from '../../entity/gift.entity';
import { GiftRepository } from '../../repositories/gift-repositories';
import { PresentOwnerModel } from '../../dtos/present-owner-model';

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

  async updateGift(id: string, giftModel: GiftUpdateModel): Promise<GiftEntity> {
    return this.giftRepository.updateGift(id, giftModel);
  }

  async deleteGift(id: string): Promise<GiftEntity[]> {
    return this.giftRepository.deleteGift(id);
  }

  async updateGiftStatus(id: string, status: GiftStatus): Promise<GiftEntity> {
    return this.giftRepository.updateGiftStatus(id, status);
  }

  async setPresentOwner(id: string, presentOwnerData: PresentOwnerModel): Promise<GiftEntity> {
    return this.giftRepository.setPresentOwner(id, presentOwnerData);
  }
}
