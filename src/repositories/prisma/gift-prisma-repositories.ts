import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";

import { GiftRepository } from "../gift-repositories";
import { PrismaService } from "../../database/prisma.service";
import { GiftModel } from "../../dtos/gift-model";
import { GiftEntity } from "../../entity/gift.entity";

@Injectable()
export class GiftPrismaRepository implements GiftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createGift(props: GiftModel): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.create({
        data: props,
      });
  
      return gift;
    } catch (error) {
      throw new InternalServerErrorException("Error creating gift", error);      
    }
  }

  async getGiftById(id: string): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.findUnique({
        where: { id },
      });

      if (!gift) throw new NotFoundException("Gift not found");

      return gift;
    } catch (error) {
      throw new InternalServerErrorException("Error getting gift", error);
    }
  }

  async updateGift(id: string, props: GiftModel): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.update({
        where: { id },
        data: props,
      });

      if (!gift) throw new NotFoundException("Gift not found");

      return gift;
    } catch (error) {
      throw new InternalServerErrorException("Error updating gift", error);      
    }
  }

  async deleteGift(id: string): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.delete({
        where: { id },
      });

      if (!gift) throw new NotFoundException("Gift not found");

      return gift;
    } catch (error) {
      throw new InternalServerErrorException("Error deleting gift", error);      
    }
  }

  async getAllGifts(): Promise<GiftEntity[]> {
    try {
      const gifts = await this.prismaService.gift.findMany()

      if (!gifts) return []

      return gifts;
    } catch (error) {
      throw new InternalServerErrorException("Occurs an error", error);      
    }
  }
}
