// src/books/books.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { StoryService } from 'src/story/domain/interfaces/story.service.interface';
import { StoryMapper } from 'src/story/application/mapper/story.mapper';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class StoryGateway {
  private mapper: StoryMapper;
  constructor(
    @Inject('StoryService')
    private readonly service: StoryService,
  ) {
    this.mapper = new StoryMapper();
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async handleBuscarLibros(
    @MessageBody() chatMessage: { sender: string; message: string },
  ): Promise<void> {
    console.log(chatMessage);
    this.server.emit('responseMessage', chatMessage);
  }
}
