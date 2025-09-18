import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { env } from 'process';
import { GiftEntity } from '../../../entity/gift.entity';

@WebSocketGateway({
  cors: {
    origin: env.FRONTEND_URL,
  },
})
export class GiftGatewayService {
  @WebSocketServer()
  server: Server;

  notifyGiftChange(gift: GiftEntity) {
    this.server.emit('giftChange', gift);
  }
}
