import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretkey } from '../entities/secretkey.entity';
import { Posts } from '../entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SecretkeyService {
  constructor(
    @InjectRepository(Secretkey) private secretkeyRepository: Repository<Secretkey>,
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  async createSecretkey(key: string): Promise<Secretkey> {
    const newSecretkey = { key };
    const addSecretkey = new Secretkey();

    // body で渡されたデータを結合
    Object.assign(addSecretkey, newSecretkey);

    // データを保存
    const newSecretkeyData = this.secretkeyRepository.create(addSecretkey);
    return this.secretkeyRepository.save(newSecretkeyData);
  }

  async deleteSecretkey(keyId: number): Promise<Secretkey> {
    // Secretkey テーブルから、IDが合致したデータを検索
    const deleteSecretkey = await this.secretkeyRepository.findOne(keyId);

    // 投稿がある場合
    if (deleteSecretkey) {
      // 投稿を削除
      await this.secretkeyRepository.remove(deleteSecretkey);

      return deleteSecretkey;
    } else {
      throw new HttpException(
        '指定されたシークレットキーIDは存在しません',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
