import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'story' })
export class StoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  keywords: string;

  @Column()
  content: string;
}
