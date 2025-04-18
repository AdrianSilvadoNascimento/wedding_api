import { GuestModel } from "../dtos/guest-model";
import { GuestEntity } from "../entity/guest.entity";

export abstract class GuestRepository {
  abstract createGuest(props: GuestModel): Promise<GuestEntity>;
  abstract getGuestById(id: string): Promise<GuestEntity>;
  abstract updateGuest(id: string, props: GuestModel): Promise<GuestEntity>;
  abstract deleteGuest(id: string): Promise<GuestEntity>;
  abstract getAllGuests(): Promise<GuestEntity[]>;
}
