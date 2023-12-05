import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

@Injectable()
export class NotificationsService {
  static subscriptions: any[] = [];
  sendNotification(payload: any): void {
    webPush.setVapidDetails(
      'mailto:mail@test.com',
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY,
    );

    NotificationsService.subscriptions.forEach((subscription) => {
      webPush
        .sendNotification(subscription, JSON.stringify(payload))
        .catch((err) => console.error(err));
    });
  }
}
