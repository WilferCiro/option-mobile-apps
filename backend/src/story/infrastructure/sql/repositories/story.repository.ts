import { Injectable } from '@nestjs/common';
import { StoryRepository } from '../../../domain/interfaces/story.repository.interface';
import { Repository } from 'typeorm';
import { StoryEntity } from '../entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/story/domain/entities/story.type';

@Injectable()
export class StoryRepositoryImpl implements StoryRepository {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly repository: Repository<StoryEntity>,
  ) {}

  async findAll(): Promise<Story[]> {
    return await this.repository.find();
  }
}
