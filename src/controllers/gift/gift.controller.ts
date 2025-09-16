import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

import { GiftStatus } from '@prisma/client';

import { GiftService } from '../../services/gift/gift.service';
import { GiftModel, GiftUpdateModel } from '../../dtos/gift-model';
import { GiftTimeoutService } from '../../services/gift/gift-timeout/gift-timeout.service';
import { PresentOwnerModel } from '../../dtos/present-owner-model';

@Controller('gift')
export class GiftController {
  constructor(
    private readonly giftService: GiftService,
    private readonly giftTimeoutService: GiftTimeoutService,
  ) {}

  @Get('/')
  async getAllGifts() {
    return this.giftService.getAllGifts();
  }

  @Post('/admin')
  async createGift(@Body() giftModel: GiftModel) {
    return this.giftService.createGift(giftModel);
  }

  @Get('/admin/:id')
  async getGiftById(@Param('id') id: string) {
    return this.giftService.getGiftById(id);
  }

  @Put('/admin/:id')
  async updateGift(@Param('id') id: string, @Body() giftModel: GiftUpdateModel) {
    return this.giftService.updateGift(id, giftModel);
  }


  @Patch(':id/status')
  async updateGiftStatus(@Param('id') id: string, @Body() body: { status: GiftStatus }) {
    return this.giftService.updateGiftStatus(id, body.status);
  }


  @Delete('/admin/:id')
  async deleteGift(@Param('id') id: string) {
    return this.giftService.deleteGift(id);
  }

  @Get('/blocked-info')
  async getBlockedGiftsInfo() {
    return this.giftTimeoutService.getBlockedGiftsInfo();
  }

  @Post(':id/present-owner')
  async setPresentOwner(@Param('id') id: string, @Body() presentOwnerData: PresentOwnerModel) {
    return this.giftService.setPresentOwner(id, presentOwnerData);
  }
}
