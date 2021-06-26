import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pref } from '../entities/pref.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrefService {
  constructor(
    @InjectRepository(Pref) private prefRepository: Repository<Pref>,
  ) {}

  getAllPref(): Promise<Pref[]> {
    return this.prefRepository.find();
  }

  getOnePref(id: number): Promise<Pref> {
    if (id < 1 || 47 < id) {
      throw new HttpException(
        'prefId は 1 ~ 47までの数字を指定してください。',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prefRepository.findOneOrFail(id);
  }
}
