import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrefService } from '../services/pref.service';
import { Pref } from '../entities/pref.entity';
import { PrefDto } from '../dto/pref-dto';
import { ErrorResponse } from '../dto/response-dto';

@ApiTags('pref')
@Controller('pref')
export class PrefController {
  constructor(private readonly prefService: PrefService) {}

  @ApiOperation({
    summary: '全都道府県データ取得API',
    description: '全都道府県データを配列で返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: [PrefDto],
  })
  @Get()
  async getAllPref(): Promise<Pref[]> {
    return this.prefService.getAllPref();
  }

  @ApiOperation({
    summary: '都道府県データ取得API',
    description: '指定したIDの都道府県データを返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: PrefDto,
  })
  @ApiResponse({
    status: 400,
    description: 'prefId が 1 ~ 47までの数字でない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'prefId', description: '都道府県ID', type: 'number' })
  @Get(':prefId')
  async getOnePref(@Param('prefId') prefId: number): Promise<Pref> {
    return this.prefService.getOnePref(prefId);
  }
}