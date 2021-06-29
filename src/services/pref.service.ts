import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pref } from '../entities/pref.entity';
import { GetPrefResponse } from '../dto/response-dto';
import { Repository } from 'typeorm';

@Injectable()
export class PrefService {
  constructor(
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
  ) {}

  // 全ての都道府県情報を取得
  async getAllPref(): Promise<Pref[]> {
    return await this.prefRepository.find({
      order: { id: 'ASC' },
    });
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
