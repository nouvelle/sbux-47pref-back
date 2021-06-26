import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pref } from './pref.entity';
import { Tags } from './tags.entity';
import { Store } from './store.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column('text')
  author: string;

  @Column({ type: 'text', nullable: true })
  secretkey: string;

  @Column({ type: 'text', nullable: true })
  snshandle: string;

  @Column({ type: 'text', nullable: true })
  tag: string;

  @ManyToOne(() => Pref, (pref) => pref.posts)
  @JoinColumn({ name: 'pref_id' })
  pref: Pref;

  @ManyToOne(() => Store, (store) => store.posts)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToMany(() => Tags)
  @JoinTable({ name: 'posts_tags' })
  tags: Tags[];
}
