import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { Pref } from '../entities/pref.entity';
import { Store } from '../entities/store.entity';
import { PostsInterface } from '../interfaces/posts.interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  async getAllPosts(limit: number, offset: number): Promise<Posts[]> {
    return await this.postsRepository.find({
      order: { id: 'ASC' },
      relations: ['pref', 'store', 'tags'],
      take: limit,
      skip: offset,
    });
  }

  async createPosts(post: PostsInterface): Promise<Posts> {
    const newPostData = { ...post, created_at: new Date() };

    const addPostData = new Posts();

    // body で渡されたデータを結合
    Object.assign(addPostData, newPostData);

    // 店舗情報が送られてきた場合
    if (newPostData.store_id) {
      // 店舗情報から所在地の都道府県を抽出
      const prefStore = await this.storeRepository.find({
        relations: ['pref'],
        where: { id: newPostData.store_id },
      });
      // 外部キーになっているカラムの設定
      addPostData.pref = <any>{ id: prefStore[0].pref.id };
      addPostData.store = <any>{ id: newPostData.store_id };
    }

    // データを保存
    const newPost = this.postsRepository.create(addPostData);
    return this.postsRepository.save(newPost);
  }
}
