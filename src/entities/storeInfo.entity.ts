import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Pref } from './pref.entity';
import { Posts } from './posts.entity';

@Entity()
export class StoreInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  store_name: string;

  @Column('text')
  address: string;

  @Column('text')
  office_hour: string;

  @Column('text')
  wifi: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ type: 'text', nullable: true })
  location_type: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  listed: boolean;

  @Column('timestamp with time zone')
  transaction_date: Date;

  @ManyToOne(() => Pref, (pref) => pref.store_info)
  @JoinColumn({ name: 'pref_id'})
  pref: Pref;

  @OneToMany(() => Posts, (posts) => posts.store_info)
  posts: Posts[];
}
