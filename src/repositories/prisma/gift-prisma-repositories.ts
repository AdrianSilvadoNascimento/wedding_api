import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { GiftStatus } from '@prisma/client';

import { GiftRepository } from '../gift-repositories';
import { PrismaService } from '../../database/prisma.service';
import { GiftModel, GiftUpdateModel } from '../../dtos/gift-model';
import { GiftEntity } from '../../entity/gift.entity';
import { GiftGatewayService } from '../../services/gift/gift-gateway/gift-gateway.service';
import { PresentOwnerModel } from '../../dtos/present-owner-model';

@Injectable()
export class GiftPrismaRepository implements GiftRepository {
  constructor(private readonly prismaService: PrismaService, private readonly giftGatewayService: GiftGatewayService) { }

  async createGift(props: GiftModel): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.create({
        data: props,
      });

      return gift;
    } catch (error) {
      throw new InternalServerErrorException('Error creating gift', error);
    }
  }

  async getGiftById(id: string): Promise<GiftEntity> {
    try {
      const gift = await this.prismaService.gift.findUnique({
        where: { id },
        include: { present_owner: true }
      });

      if (!gift) throw new NotFoundException('Gift not found');

      return gift;
    } catch (error) {
      throw new InternalServerErrorException('Error getting gift', error);
    }
  }

  async updateGift(id: string, props: GiftUpdateModel): Promise<GiftEntity> {
    try {
      const updateData = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== undefined)
      );

      const gift = await this.prismaService.gift.update({
        where: { id },
        data: updateData,
        include: { present_owner: true }
      });

      if (!gift) throw new NotFoundException('Gift not found');

      return gift;
    } catch (error) {
      console.error('Error updating gift:', error);
      throw new InternalServerErrorException('Error updating gift', error);
    }
  }

  async deleteGift(id: string): Promise<GiftEntity[]> {
    try {
      const gift = await this.prismaService.gift.delete({
        where: { id },
        include: { present_owner: true }
      });

      if (!gift) throw new NotFoundException('Gift not found');

      return await this.prismaService.gift.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error deleting gift', error);
    }
  }

  async getAllGifts(): Promise<GiftEntity[]> {
    try {
      const gifts = await this.prismaService.gift.findMany(
        { include: { present_owner: true } }
      );

      if (!gifts) return [];

      return gifts;
    } catch (error) {
      throw new InternalServerErrorException('Occurs an error', error);
    }
  }

  async updateGiftStatus(id: string, status: GiftStatus): Promise<GiftEntity> {
    try {
      const updateData: any = { status };

      if (status === GiftStatus.BLOCK) {
        updateData.blocked_at = new Date();
      }

      if (status === GiftStatus.AVAILABLE || status === GiftStatus.RESERVED || status === GiftStatus.SOLD) {
        updateData.blocked_at = null;
      }

      const gift = await this.prismaService.gift.update({
        where: { id },
        data: updateData,
        include: { present_owner: true }
      });

      if (!gift) throw new NotFoundException('Gift not found');

      this.giftGatewayService.notifyGiftChange(gift);

      return gift;
    } catch (error) {
      throw new InternalServerErrorException('Error updating gift status', error);
    }
  }

  async setPresentOwner(id: string, presentOwnerData: PresentOwnerModel): Promise<GiftEntity> {
    try {
      // Verifica se o presente existe e está disponível
      const existingGift = await this.prismaService.gift.findUnique({
        where: { id },
        include: { present_owner: true }
      });

      if (!existingGift) {
        throw new NotFoundException('Present not found');
      }

      if (existingGift.status !== GiftStatus.AVAILABLE && existingGift.status !== GiftStatus.BLOCK) {
        throw new BadRequestException('Present is not available for reservation/purchase');
      }

      const existingOwner = await this.prismaService.presentOwner.findFirst({
        where: {
          name: { equals: presentOwnerData.name, mode: 'insensitive' }
        },
        include: { gift: true }
      });

      if (existingOwner) {
        throw new BadRequestException(`${presentOwnerData.name} já possui um presente (${existingOwner.gift.name})`);
      }

      const newStatus = presentOwnerData.action === 'RESERVED' ? GiftStatus.RESERVED : GiftStatus.SOLD;

      const updatedGift = await this.prismaService.gift.update({
        where: { id },
        data: {
          status: newStatus,
          blocked_at: null, // Remove o bloqueio se existir
          present_owner: {
            create: {
              name: presentOwnerData.name,
              notes: presentOwnerData.notes || '',
              estimated_delivery: presentOwnerData.estimated_delivery || '',
            }
          }
        },
        include: { present_owner: true }
      });

      this.giftGatewayService.notifyGiftChange(updatedGift);

      console.log(`Present ${existingGift.name} ${presentOwnerData.action.toLowerCase()} by ${presentOwnerData.name}`);

      return updatedGift;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error setting present owner:', error);
      throw new InternalServerErrorException('Error setting present owner', error);
    }
  }
}
