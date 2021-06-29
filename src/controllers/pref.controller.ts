import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrefService } from '../services/pref.service';
import { Pref } from '../entities/pref.entity';
import { PrefDto } from '../dto/pref-dto';
import { ErrorResponse, GetPrefResponse } from '../dto/response-dto';

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
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
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
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'prefId', description: '都道府県ID', type: 'number' })
  @Get(':prefId')
  async getOnePref(@Param('prefId') prefId: number): Promise<GetPrefResponse> {
    return this.prefService.getOnePref(prefId);
  }

  // 各都道府県の最新の投稿のみを含んだデータ取得API
  @ApiOperation({
    summary: '各都道府県の最新の投稿のみを含んだデータ取得API',
    description: '各都道府県の最新の投稿のみを含んだデータを取得する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    // type: GetImageResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @Get('post/latest')
  async getPrefLatestImageList(): Promise<any> {
    return await this.prefService.getPrefLatestPostList();
  }
}
