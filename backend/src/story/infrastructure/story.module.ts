// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryEntity } from './sql/entities/story.entity';
import { StoryRepositoryImpl } from './sql/repositories/story.repository';
import { StoryServiceImpl } from '../application/services/story.service';
import { StoryGateway } from './gateway/story.gateway';

const providers: Provider[] = [
  {
    provide: 'StoryRepository',
    useClass: StoryRepositoryImpl,
  },
  {
    provide: 'StoryService',
    useClass: StoryServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([StoryEntity])],
  controllers: [],
  providers: [...providers, StoryGateway],
})
export class StoryModule {}
