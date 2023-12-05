import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from '../application/notifications.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
