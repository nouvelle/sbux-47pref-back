import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ImageService } from '../services/image.service';
import {
  ErrorResponse,
  GetAllImagesResponse,
  GetImageResponse,
  UploadImageResponse,
} from '../dto/response-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // 全画像データ取得API
  @ApiOperation({
    summary: '全画像データ取得API',
    description: 'S3から全ての画像データを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: [GetAllImagesResponse],
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @Get()
  async getImageList(): Promise<any> {
    return await this.imageService.getImageList();
  }

  // 特定の画像データ取得API
  @ApiOperation({
    summary: '特定の画像データ取得API',
    description: 'S3から特定の画像データを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: GetImageResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'filename', description: '画像key', type: 'string' })
  @Get(':filename')
  async getOneImage(@Param('filename') filename: string): Promise<any> {
    return await this.imageService.getOneImage(filename);
  }

  // 画像アップロードAPI
  @ApiOperation({
    summary: '画像アップロードAPI',
    description: 'S3に画像をアップロードする',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: UploadImageResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiQuery({
    name: 'imgData',
    description: '画像key',
    type: 'string',
  })
  @ApiQuery({
    name: 'file',
    description: '画像データ',
    type: 'Blob',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Query('imgData') imgData: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.imageService.uploadFile(imgData, file);
  }
}
