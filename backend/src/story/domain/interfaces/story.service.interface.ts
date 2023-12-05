// Nest

// Domain
import { Story } from '../entities/story.type';

// Shared

export interface StoryService {
  findAll(): Promise<Story[]>;
}
