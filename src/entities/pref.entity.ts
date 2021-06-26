import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { StoreInfo } from './storeInfo.entity';
import { Posts } from './posts.entity';

// 都道府県テーブル
@Entity()
export class Pref {
  @PrimaryColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  nameJP: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ type: 'decimal', nullable: true })
  zoom: number;

  @Column({ type: 'decimal', nullable: true })
  clusterZoom: number;

  @Column('text')
  drink: string;

  @OneToMany(() => StoreInfo, (storeInfo) => storeInfo.pref)
  store_info: StoreInfo[];

  @OneToMany(() => Posts, (posts) => posts.pref)
  posts: Posts[];
}
