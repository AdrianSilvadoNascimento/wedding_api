import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { env } from 'process';
import { GiftStatus } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: env.FRONTEND_URL,
  },
})
export class GiftGatewayService {
  @WebSocketServer()
  server: Server;

  notifyGiftStatusChange(giftId: string, status: GiftStatus) {
    this.server.emit('giftStatusChange', { giftId, status });
  }
}
