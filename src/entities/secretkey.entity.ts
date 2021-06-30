import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Secretkey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  key: string;

  @OneToOne(() => Posts, (posts) => posts.secretkey)
  posts: Posts;
}
