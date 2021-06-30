import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Pref } from './pref.entity';
import { Tags } from './tags.entity';
import { Secretkey } from './secretkey.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column('text')
  author: string;

  @Column({ type: 'text', nullable: true })
  snshandle: string;

  @Column({ type: 'text', nullable: true })
  tag: string;

  @ManyToOne(() => Pref, (pref) => pref.posts)
  @JoinColumn({ name: 'pref_id' })
  pref: Pref;

  @ManyToMany(() => Tags)
  @JoinTable({ name: 'posts_tags' })
  tags: Tags[];

  @OneToOne(() => Secretkey, (secretkey) => secretkey.posts)
  @JoinColumn({ name: 'secretkey_id' })
  secretkey: Secretkey;
}
