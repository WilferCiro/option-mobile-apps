// Nest
import { Injectable } from '@nestjs/common';

// Application

// Domain
import { Story } from 'src/story/domain/entities/story.type';
import { StoryDto } from '../dto/story.dto';

// Shared

@Injectable()
export class StoryMapper {
  toDto(story: Story): StoryDto {
    return story as StoryDto;
  }
}
