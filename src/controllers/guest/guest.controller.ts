import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { GuestService } from '../../services/guest/guest.service';
import { GuestModel } from '../../dtos/guest-model';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}
  
  @Get('/')
  async getAllGuests() {
    return this.guestService.getAllGuests();
  }

  @Get('/:id')
  async getGuestById(@Param('id') id: string) {
    return this.guestService.getGuestById(id);
  }

  @Post('/create')
  async createGuest(@Body() guestModel: GuestModel) {
    return this.guestService.createGuest(guestModel);
  }

  @Post('/update/:id')
  async updateGuest(@Param('id') id: string, @Body() guestModel: GuestModel) {
    return this.guestService.updateGuest(id, guestModel);
  }

  @Delete('/delete/:id')
  async deleteGuest(@Param('id') id: string) {
    return this.guestService.deleteGuest(id);
  }
}
