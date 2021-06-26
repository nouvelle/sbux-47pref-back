import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrefService } from '../services/pref.service';
import { PrefDto } from '../dto/pref-dto';
import { NormalResponse, ErrorResponse } from '../dto/response-dto';

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
    type: NormalResponse,
  })
  @Get()
  async getAllPref(): Promise<PrefDto[]> {
    return this.prefService.getAllPref();
  }

  @ApiOperation({
    summary: '都道府県データ取得API',
    description: '指定したIDの都道府県データを返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: NormalResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'パスワードをチェックできない場合、パスワードは8文字以上小文字大文字を含む英数字記号で入力していない場合、試行回数の制限を超えている場合',
    type: ErrorResponse,
  })
  @Get(':prefId')
  async getOnePref(@Param('prefId') prefId: number): Promise<PrefDto> {
    return this.prefService.getOnePref(prefId);
  }
}
