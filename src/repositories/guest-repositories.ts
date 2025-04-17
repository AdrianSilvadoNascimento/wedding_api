export abstract class GuestRepository {
  abstract createGuest(props: any): Promise<any>;
  abstract getGuestById(id: string): Promise<any>;
  abstract updateGuest(id: string, props: any): Promise<any>;
  abstract deleteGuest(id: string): Promise<any>;
  abstract getAllGuests(): Promise<any[]>;
}
