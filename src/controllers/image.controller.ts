import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from '../services/image.service';
import { ErrorResponse } from '../dto/response-dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // 全画像データ取得API
  @ApiOperation({
    summary: '全投稿データ取得API',
    description: 'S3から全ての投稿データを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    // type: [PostsDto],
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @Get()
  async getAllPref(): Promise<any> {
    return this.imageService.getImageList();
  }

  // 画像アップロードAPI
  @ApiOperation({
    summary: '画像アップロードAPI',
    description: 'S3に画像をアップロードする',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    // type: [PostsDto],
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiQuery({ name: 'filename', description: '画像名', type: 'string' })
  @ApiQuery({
    name: 'filetype',
    description: '画像データタイプ',
    type: 'string',
  })
  @ApiQuery({
    name: 'prefId',
    description: '都道府県ID',
    type: 'number',
    required: false,
  })
  @Post()
  async uploadFile(
    @Query('filename') filename: string,
    @Query('filetype') filetype: string,
    @Query('prefId') prefId: number | null,
    @Body() data: any,
  ): Promise<any> {
    return this.imageService.uploadFile(filename, filetype, data);
  }
}
