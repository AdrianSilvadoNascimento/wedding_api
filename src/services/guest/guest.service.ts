import { Injectable } from '@nestjs/common';

import { GuestModel } from '../../dtos/guest-model';
import { GuestEntity } from '../../entity/guest.entity';
import { GuestRepository } from '../../repositories/guest-repositories';

@Injectable()
export class GuestService {
  constructor(private readonly guestRepository: GuestRepository) {}

  async getAllGuests(): Promise<GuestEntity[]> {
    return this.guestRepository.getAllGuests();
  }

  async getGuestById(id: string): Promise<GuestEntity> {
    return this.guestRepository.getGuestById(id);
  }

  async createGuest(guestModel: GuestModel): Promise<GuestEntity> {
    return this.guestRepository.createGuest(guestModel);
  }

  async updateGuest(id: string, guestModel: GuestModel): Promise<GuestEntity> {
    return this.guestRepository.updateGuest(id, guestModel);
  }

  async deleteGuest(id: string): Promise<GuestEntity> {
    return this.guestRepository.deleteGuest(id);
  }
}
