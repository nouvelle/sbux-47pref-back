import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  async getAllStore(limit: number, offset: number): Promise<Store[]> {
    return await this.storeRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });
  }

  async getOneStore(id: number): Promise<Store> {
    return await this.storeRepository.findOneOrFail(id).catch(() => {
      throw new HttpException(
        '指定されたIDの店舗はありません',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async getPrefStore(
    id: number,
    limit: number,
    offset: number,
  ): Promise<Store[]> {
    if (id < 1 || 47 < id) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    // prefテーブルをjoinし、IDが合致したデータを応答する
    return await this.storeRepository.find({
      relations: ['pref', 'posts'],
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
      where: {
        listed: true,
        pref: { id },
      },
    });
  }
}
