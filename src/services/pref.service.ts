import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pref } from '../entities/pref.entity';
import { GetPrefResponse } from '../dto/response-dto';
import { Repository } from 'typeorm';
import { ImageService } from './image.service';

@Injectable()
export class PrefService {
  constructor(
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
    private readonly imageService: ImageService,
  ) {}

  // 全ての都道府県情報を取得
  async getAllPref(): Promise<Pref[]> {
    return await this.prefRepository.find({
      order: { id: 'ASC' },
    });
  }

  // 全ての都道府県の最新の投稿のみを含んだデータを取得
  async getPrefLatestPostList(): Promise<any> {
    const prefData = await this.prefRepository.find({
      order: { id: 'ASC' },
      relations: ['posts'],
    });
    for (const pref of prefData) {
      // 投稿件数を応答
      pref['posts_num'] = pref.posts.length;
      // 投稿データがあるもの
      if (pref.posts.length > 0) {
        // 投稿データの中で最新の updated_at を取得
        const maxUnixTime = Math.max.apply(
          null,
          pref.posts.map((post) => post.updated_at),
        );
        // 該当の updated_at を持つ投稿データを探す
        const latestData = pref.posts.filter(
          (post) => post.updated_at.getTime() === maxUnixTime,
        );

        // 画像データをS3から取得する
        if (latestData[0].image) {
          const s3Image = await this.imageService
            .getOneImage(latestData[0].image)
            .catch((err) => console.log(err));

          // 画像データがS3に存在するものは、base64データをオブジェクトに追加
          if (s3Image) {
            // 投稿データの配列を最新データのみに上書きする
            pref.posts = latestData;
            pref['s3Image'] = s3Image;
          } else {
            // 画像データがS3に存在しないものは、存在しないものとしてデータを書き換える
            // -> DBにはデータがあるけど、S3に存在しないような場合で発生しうる（イレギュラーケース）
            pref.is_post = false;
            pref.posts = [];
          }
        }
      }
    }

    return prefData;
  }

  // 指定した都道府県IDの投稿データを応答
  async getOnePref(prefId: number): Promise<GetPrefResponse> {
    if (prefId < 1 || 47 < prefId) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prefRepository.findOneOrFail(prefId, {
      relations: ['posts'],
    });
  }

  // is_post の更新
  async updateIsPost(prefId: number, status: boolean): Promise<Pref> {
    if (prefId < 1 || 47 < prefId) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    // pref テーブルから、IDが合致したデータを検索
    const updatePost = await this.prefRepository.findOne(prefId);

    // status を更新
    Object.assign(updatePost, { is_post: status });
    // データを保存
    return this.prefRepository.save(updatePost);
  }
}
