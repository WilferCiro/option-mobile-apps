import { Module } from '@nestjs/common';
import { CoreModule } from './shared/core.module';
import { PostgresProvider } from './shared/infrastructure/database/postgresql/postgresql.provider';
import { EmailProvider } from './shared/infrastructure/email/email.provider';
import { StoryModule } from './story/infrastructure/story.module';
import { NotificationsModule } from './notifications/infrastructure/notifications.module';

@Module({
  imports: [
    CoreModule,
    NotificationsModule,
    PostgresProvider,
    EmailProvider,
    StoryModule,
  ],
})
export class AppModule {}
