import { GiftModel } from "../dtos/gift-model";
import { GiftEntity } from "../entity/gift.entity";

export abstract class GiftRepository {
  abstract createGift(props: GiftModel): Promise<GiftEntity>;
  abstract getGiftById(id: string): Promise<GiftEntity>;
  abstract updateGift(id: string, props: GiftModel): Promise<GiftEntity>;
  abstract deleteGift(id: string): Promise<GiftEntity[]>;
  abstract getAllGifts(): Promise<GiftEntity[]>;
}
