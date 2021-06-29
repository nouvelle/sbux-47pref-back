import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Posts } from './posts.entity';

// 都道府県テーブル
@Entity()
export class Pref {
  @PrimaryColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  nameJP: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @Column('decimal')
  zoom: number;

  @Column('decimal')
  clusterZoom: number;

  @Column('text')
  drink: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_post: boolean;

  @OneToMany(() => Posts, (posts) => posts.pref)
  posts: Posts[];
}
