import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { GiftService } from '../../services/gift/gift.service';
import { GiftModel } from '../../dtos/gift-model';

@Controller('gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Get('/')
  async getAllGifts() {
    return this.giftService.getAllGifts();
  }

  @Get('/:id')
  async getGiftById(@Param('id') id: string) {
    return this.giftService.getGiftById(id);
  }

  @Post('/create')
  async createGift(@Body() giftModel: GiftModel) {
    return this.giftService.createGift(giftModel);
  }

  @Post('/update/:id')
  async updateGift(@Param('id') id: string, @Body() giftModel: GiftModel) {
    return this.giftService.updateGift(id, giftModel);
  }

  @Delete('/delete/:id')
  async deleteGift(@Param('id') id: string) {
    return this.giftService.deleteGift(id);
  }
}
