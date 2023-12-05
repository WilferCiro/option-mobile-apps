// Nest

// Domain
import { Story } from '../entities/story.type';

// Shared

export interface StoryRepository {
  findAll(): Promise<Story[]>;
}
