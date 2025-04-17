import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { GiftRepository } from "../gift-repositories";
import { PrismaService } from "src/database/prisma.service";

@Injectable();
export class GiftPrismaRepository implements GiftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createGift(props: any): Promise<any> {
    const gift = await this.prismaService.gift.create({
      data: props,
    });

    return gift;
  }

  async getGiftById(id: string): Promise<any> {}

  async updateGift(id: string, props: any): Promise<any> {}

  async deleteGift(id: string): Promise<any> {}

  async getAllGifts(): Promise<any[]> {}
}
