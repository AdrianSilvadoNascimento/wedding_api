export abstract class GiftRepository {
  abstract createGift(props: any): Promise<any>;
  abstract getGiftById(id: string): Promise<any>;
  abstract updateGift(id: string, props: any): Promise<any>;
  abstract deleteGift(id: string): Promise<any>;
  abstract getAllGifts(): Promise<any[]>;
}
