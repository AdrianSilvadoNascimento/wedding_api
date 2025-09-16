import { GiftStatus } from "@prisma/client";

import { GiftModel, GiftUpdateModel } from "../dtos/gift-model";
import { GiftEntity } from "../entity/gift.entity";
import { PresentOwnerModel } from "../dtos/present-owner-model";

export abstract class GiftRepository {
  abstract createGift(props: GiftModel): Promise<GiftEntity>;
  abstract getGiftById(id: string): Promise<GiftEntity>;
  abstract updateGift(id: string, props: GiftUpdateModel): Promise<GiftEntity>;
  abstract deleteGift(id: string): Promise<GiftEntity[]>;
  abstract getAllGifts(): Promise<GiftEntity[]>;
  abstract updateGiftStatus(id: string, status: GiftStatus): Promise<GiftEntity>;
  abstract setPresentOwner(id: string, presentOwnerData: PresentOwnerModel): Promise<GiftEntity>;
}
