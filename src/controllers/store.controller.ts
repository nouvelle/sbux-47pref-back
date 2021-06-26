import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StoreService } from '../services/store.service';
import { Store } from '../entities/store.entity';
import { StoreDto, StorePrefDto } from '../dto/store-dto';
import { ErrorResponse } from '../dto/response-dto';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // 全店舗データ取得API
  @ApiOperation({
    summary: '全店舗データ取得API',
    description: '全店舗データを配列で返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: [StoreDto],
  })
  @ApiQuery({
    name: 'limit',
    description: '応答件数（初期値: 10）',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: '応答開始位置（初期値: 0）',
    type: 'number',
    required: false,
  })
  @Get()
  async getAllPref(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<Store[]> {
    return this.storeService.getAllStore(limit, offset);
  }

  // 店舗データ取得API
  @ApiOperation({
    summary: '店舗データ取得API',
    description: '指定したIDの店舗データを返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: StoreDto,
  })
  @ApiResponse({
    status: 400,
    description: '指定したIDの店舗が存在しない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'storeId', description: '店舗ID', type: 'number' })
  @Get(':storeId')
  async getOnePref(@Param('storeId') storeId: number): Promise<Store> {
    return this.storeService.getOneStore(storeId);
  }

  // 都道府県別店舗データ取得API
  @ApiOperation({
    summary: '都道府県別店舗データ取得API',
    description: '指定した都道府県IDの店舗データを返す',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: [StorePrefDto],
  })
  @ApiResponse({
    status: 400,
    description: '指定した都道府県IDの店舗が存在しない場合',
    type: ErrorResponse,
  })
  @ApiQuery({
    name: 'limit',
    description: '応答件数（初期値: 10）',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: '応答開始位置（初期値: 0）',
    type: 'number',
    required: false,
  })
  @Get('/pref/:prefId')
  async getPrefStore(
    @Param('prefId') prefId: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<Store[]> {
    return this.storeService.getPrefStore(prefId, limit, offset);
  }
}
