import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pref } from '../entities/pref.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrefService {
  constructor(
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
  ) {}

  async getAllPref(): Promise<Pref[]> {
    return await this.prefRepository.find({
      order: { id: 'ASC' },
    });
  }

  async getOnePref(id: number): Promise<Pref> {
    if (id < 1 || 47 < id) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prefRepository.findOneOrFail(id);
  }

  async updateIsPost(id: number, status: boolean): Promise<Pref> {
    if (id < 1 || 47 < id) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    // pref テーブルから、IDが合致したデータを検索
    const updatePost = await this.prefRepository.findOne(id);

    // status を更新
    Object.assign(updatePost, { is_post: status });
    // データを保存
    return this.prefRepository.save(updatePost);
  }
}
