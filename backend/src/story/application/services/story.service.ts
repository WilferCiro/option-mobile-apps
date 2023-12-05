// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Story } from 'src/story/domain/entities/story.type';
import { StoryRepository } from 'src/story/domain/interfaces/story.repository.interface';
import { StoryService } from 'src/story/domain/interfaces/story.service.interface';

// Shared

@Injectable()
export class StoryServiceImpl implements StoryService {
  constructor(
    @Inject('StoryRepository')
    private readonly repository: StoryRepository,
  ) {}

  async findAll(): Promise<Story[]> {
    return await this.repository.findAll();
  }
}
