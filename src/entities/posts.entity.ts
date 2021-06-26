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
import { StoreInfo } from './storeInfo.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  visited_date: Date;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column('text')
  comments: string;

  @Column('text')
  author: string;

  @Column('text')
  secretkey: string;

  @Column('text')
  snshandle: string;

  @Column('text')
  tag: string;

  @ManyToOne(() => Pref, (pref) => pref.posts)
  @JoinColumn({ name: 'pref_id' })
  pref: Pref;

  @ManyToOne(() => StoreInfo, (storeInfo) => storeInfo.posts)
  @JoinColumn({ name: 'store_id' })
  store_info: StoreInfo;

  @ManyToMany(() => Tags)
  @JoinTable({ name: 'posts_tags' })
  tags: Tags[];
}
