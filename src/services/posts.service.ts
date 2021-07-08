import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { Pref } from '../entities/pref.entity';
import { PrefService } from './pref.service';
import { SecretkeyService } from './secretkey.service';
import {
  PostsInterface,
  SecretkeyInterface,
} from '../interfaces/posts.interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
    private readonly prefService: PrefService,
    private readonly secretkeyService: SecretkeyService,
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

  async getPrefPostList(
    prefId: number,
    limit: number,
    offset: number,
  ): Promise<any> {
    if (prefId < 1 || 47 < prefId) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.postsRepository.findAndCount({
      relations: ['pref'],
      where: {
        pref: { id: prefId },
      },
      order: { id: 'DESC' },
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

  async checkIsSecretkey(postId: number): Promise<any> {
    // 投稿IDから該当の投稿データ(シークレットキーデータ含む)を取得
    const postData = await this.postsRepository.findOne(postId, {
      relations: ['secretkey'],
    });

    // 投稿がある場合
    if (postData) {
      if (postData.secretkey.key) {
        // シークレットキーがある場合
        return { result: true };
      } else {
        // シークレットキーがない場合
        return { result: false };
      }
    } else {
      throw new HttpException(
        '指定された投稿IDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkSecretkey(
    postId: number,
    secretkey: SecretkeyInterface,
  ): Promise<any> {
    // 投稿IDから該当の投稿データ(シークレットキーデータ含む)を取得
    const postData = await this.postsRepository.findOne(postId, {
      relations: ['secretkey'],
    });
    // 投稿がある場合
    if (postData) {
      // シークレットキーない場合
      if (!postData.secretkey.key) {
        throw new HttpException(
          '指定された投稿IDにはシークレットキーが存在しません',
          HttpStatus.BAD_REQUEST,
        );
      }
      // 取得した投稿データと送られてきたシークレットキーの整合性をチェック
      if (postData.secretkey.key === secretkey.key) {
        return { result: true };
      } else {
        return { result: false };
      }
    } else {
      throw new HttpException(
        '指定された投稿IDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPosts(post: PostsInterface): Promise<any> {
    const newPostData = {
      author: post.author,
      snshandle: post.snshandle,
      comments: post.comments,
      pref_id: post.pref_id,
      image: post.image,
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
      // pref テーブルの is_post をtrue にする
      await this.prefService.updateIsPost(prefInfo[0].id, true);
    }

    // シークレットキーテーブルにデータ追加
    const createdSecretKey = await this.secretkeyService.createSecretkey(
      post.secretkey,
    );

    // シークレットキーId を結合
    Object.assign(addPostData, { secretkey: { id: createdSecretKey.id } });

    // データを保存
    const newPost = await this.postsRepository.create(addPostData);
    return await this.postsRepository.save(newPost);
  }

  // 投稿のアップデート時には、シークレットキーの変更はできないものとする！
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
    const deletePost = await this.postsRepository.findOne(postId, {
      relations: ['pref', 'secretkey'],
    });

    // 投稿がある場合
    if (deletePost) {
      // 投稿を削除
      await this.postsRepository.remove(deletePost);

      // シークレットキーがある場合
      if (deletePost.secretkey) {
        // シークレットキーを削除
        await this.secretkeyService.deleteSecretkey(deletePost.secretkey.id);
      }

      //  対象の都道府県データを取得
      const prefData = await this.prefService.getOnePref(deletePost.pref.id);

      // postデータがあるかどうかチェック、なければ is_post を false にする
      if (prefData.posts.length === 0) {
        const prefInfo = await this.prefRepository.find({
          where: { id: deletePost.pref.id },
        });
        // pref テーブルの is_post を false にする
        await this.prefService.updateIsPost(prefInfo[0].id, false);
      }
      return deletePost;
    } else {
      throw new HttpException(
        '指定された投稿データIDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
