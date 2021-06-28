import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { Pref } from '../entities/pref.entity';
import { PostsInterface } from '../interfaces/posts.interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
  ) {}

  async getAllPosts(limit: number, offset: number): Promise<any> {
    const data = await this.postsRepository.findAndCount({
      order: { id: 'DESC' },
      relations: ['pref'],
      take: limit,
      skip: offset,
    });
    const [result, total] = data;
    const hasMore = total - (Number(offset) + result.length) > 0;
    return {
      data: [...result],
      total: total,
      has_more: hasMore,
    };
  }

  async getOnePost(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne(id, {
      relations: ['pref'],
    });

    // 投稿がある場合
    if (post) {
      return post;
    } else {
      throw new HttpException(
        '指定された投稿データIDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPosts(post: PostsInterface): Promise<Posts> {
    const newPostData = {
      ...post,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const addPostData = new Posts();

    // body で渡されたデータを結合
    Object.assign(addPostData, newPostData);

    //  都道府県情報がある場合
    if (newPostData.pref_id) {
      const prefInfo = await this.prefRepository.find({
        where: { id: newPostData.pref_id },
      });
      // 外部キーになっているカラムの設定
      addPostData.pref = <any>{ id: prefInfo[0].id };
    }

    // データを保存
    const newPost = this.postsRepository.create(addPostData);
    return this.postsRepository.save(newPost);
  }

  async updatePosts(postId: number, post: PostsInterface): Promise<Posts> {
    // posts テーブルから、IDが合致したデータを検索
    const updatePost = await this.postsRepository.findOne(postId);

    // body で渡されたデータを結合
    Object.assign(updatePost, { updated_at: new Date() }, post);

    //  都道府県情報がある場合
    if (post.pref_id) {
      const prefInfo = await this.prefRepository.find({
        where: { id: post.pref_id },
      });
      // 外部キーになっているカラムの設定
      updatePost.pref = <any>{ id: prefInfo[0].id };
    }

    // データを保存
    return this.postsRepository.save(updatePost);
  }

  async deletePosts(postId: number): Promise<Posts> {
    // posts テーブルから、IDが合致したデータを検索
    const deletePost = await this.postsRepository.findOne(postId);

    // 投稿がある場合
    if (deletePost) {
      // 店舗情報から所在地の都道府県を抽出
      return await this.postsRepository.remove(deletePost);
    } else {
      throw new HttpException(
        '指定された投稿データIDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
