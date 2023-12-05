import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/application/notifications.service';

@Controller('push')
export class NotificationsController {
  constructor(private readonly appService: NotificationsService) {}

  @Get('send')
  sendMessage(@Query('message') message: string) {
    this.appService.sendNotification(message);
    return {
      sent: message,
    };
  }

  @Post('subscribe')
  async subscribe(@Body() subscription: any): Promise<void> {
    const currentSubs = NotificationsService.subscriptions;
    const finded = (currentSubs || []).findIndex(
      (sub) => sub.keys.auth === subscription.keys.auth,
    );
    if (finded === -1) {
      NotificationsService.subscriptions.push(subscription);
    } else if (
      (currentSubs[finded]?.body || '')?.includes('has unsubscribed or expired')
    ) {
      NotificationsService.subscriptions.splice(finded, 1);
      NotificationsService.subscriptions.push(subscription);
    }
  }
}
