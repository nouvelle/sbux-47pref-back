import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Tags {
  @PrimaryColumn()
  id: number;

  @Column('text')
  tag: string;

  @OneToMany(() => Posts, (post) => post.pref)
  posts: Posts[];
}
