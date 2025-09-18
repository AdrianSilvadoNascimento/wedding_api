import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GiftStatus } from '@prisma/client';

import { PrismaService } from '../../../database/prisma.service';
import { GiftGatewayService } from '../gift-gateway/gift-gateway.service';

@Injectable()
export class GiftTimeoutService {
  private readonly logger = new Logger(GiftTimeoutService.name);
  private readonly TIMEOUT_MINUTES = 20;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly giftGatewayService: GiftGatewayService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleBlockedGiftsTimeout() {
    this.logger.debug('Verificando produtos bloqueados com timeout...');

    try {
      const timeoutThreshold = new Date();
      timeoutThreshold.setMinutes(timeoutThreshold.getMinutes() - this.TIMEOUT_MINUTES);

      const expiredBlockedGifts = await this.prismaService.gift.findMany({
        where: {
          status: GiftStatus.BLOCK,
          blocked_at: {
            lt: timeoutThreshold,
          },
        },
      });

      if (expiredBlockedGifts.length > 0) {
        this.logger.log(`Encontrados ${expiredBlockedGifts.length} produtos com timeout expirado`);

        const updatedGifts = await Promise.all(
          expiredBlockedGifts.map(async (gift) => {
            const updatedGift = await this.prismaService.gift.update({
              where: { id: gift.id },
              data: { 
                status: GiftStatus.AVAILABLE,
                blocked_at: null,
              },
              include: { present_owner: true },
            });

            this.giftGatewayService.notifyGiftChange(updatedGift);
            
            this.logger.log(`Produto "${gift.name}" (${gift.id}) liberado automaticamente por timeout`);
            
            return updatedGift;
          })
        );

        this.logger.log(`${updatedGifts.length} produtos foram liberados automaticamente`);
      } else {
        this.logger.debug('Nenhum produto com timeout expirado encontrado');
      }
    } catch (error) {
      this.logger.error('Erro ao verificar timeouts de produtos bloqueados:', error);
    }
  }

  // Método para obter informações sobre produtos bloqueados (útil para debug)
  async getBlockedGiftsInfo(): Promise<any[]> {
    try {
      const blockedGifts = await this.prismaService.gift.findMany({
        where: {
          status: GiftStatus.BLOCK,
          blocked_at: { not: null },
        },
        select: {
          id: true,
          name: true,
          blocked_at: true,
        },
      });

      return blockedGifts.map(gift => {
        const now = new Date();
        const blockedAt = new Date(gift.blocked_at!);
        const minutesBlocked = Math.floor((now.getTime() - blockedAt.getTime()) / (1000 * 60));
        const minutesRemaining = Math.max(0, this.TIMEOUT_MINUTES - minutesBlocked);

        return {
          ...gift,
          minutesBlocked,
          minutesRemaining,
          willExpireAt: new Date(blockedAt.getTime() + (this.TIMEOUT_MINUTES * 60 * 1000)),
        };
      });
    } catch (error) {
      this.logger.error('Erro ao obter informações de produtos bloqueados:', error);
      return [];
    }
  }
}
