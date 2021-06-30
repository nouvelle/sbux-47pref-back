import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';
import {
  CreatePostDto,
  UpdatePostDto,
  CheckSecretkeyDto,
} from '../dto/posts-dto';
import {
  ErrorResponse,
  CreatPostResponse,
  GetAllPostResponse,
  GetPostResponse,
} from '../dto/response-dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 全投稿データ取得API
  @ApiOperation({
    summary: '全投稿データ取得API',
    description: '全ての投稿データを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: [GetAllPostResponse],
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiQuery({
    name: 'limit',
    description: '応答件数（初期値: 9）',
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
  async getAllPosts(
    @Query('limit') limit = 9,
    @Query('offset') offset = 0,
  ): Promise<Posts[]> {
    return this.postsService.getAllPosts(limit, offset);
  }

  // 投稿データ取得API
  @ApiOperation({
    summary: '投稿データ取得API',
    description: '指定した投稿IDのデータを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    type: GetPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '指定された投稿データIDが存在しない場合',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'postId', description: '投稿ID', type: 'number' })
  @Get(':postId')
  async getOnePost(@Param('postId') postId: number): Promise<Posts> {
    return this.postsService.getOnePost(postId);
  }

  // 指定した都道府県IDの投稿データ取得API
  @ApiOperation({
    summary: '指定した都道府県IDの投稿データ取得API',
    description: '指定した都道府県IDの投稿データを応答する',
  })
  @ApiResponse({
    status: 200,
    description: '取得に成功した時',
    // type: GetPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '指定された都道府県データIDが存在しない場合',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiQuery({
    name: 'limit',
    description: '応答件数（初期値: 9）',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: '応答開始位置（初期値: 0）',
    type: 'number',
    required: false,
  })
  @ApiParam({ name: 'prefId', description: '都道府県ID', type: 'number' })
  @Get('pref/:prefId')
  async getPrefPostList(
    @Param('prefId') prefId: number,
    @Query('limit') limit = 9,
    @Query('offset') offset = 0,
  ): Promise<Posts> {
    return this.postsService.getPrefPostList(prefId, limit, offset);
  }

  // 指定した投稿IDのシークレットキー確認用API
  @ApiOperation({
    summary: '指定した投稿IDのシークレットキー確認用API',
    description: '指定した投稿IDのシークレットキーが正しいかどうかをチェックする',
  })
  @ApiResponse({
    status: 200,
    description: 'チェックに成功した時',
    // type: GetPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '指定された投稿IDが存在しない場合, 指定された投稿IDにシークレットキーが存在しない場合',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'postId', description: '投稿ID', type: 'number' })
  @Post(':postId/keyCheck')
  async checkSecretkey(
    @Param('postId') postId: number,
    @Body() checkSecretkeyDto: CheckSecretkeyDto,
  ): Promise<Posts> {
    return this.postsService.checkSecretkey(postId, checkSecretkeyDto);
  }

  // データ作成API
  @ApiOperation({
    summary: 'データ作成API',
    description: 'データを作成する',
  })
  @ApiResponse({
    status: 201,
    description: '作成に成功した時',
    type: CreatPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '必須項目がクライアントから送られてきていない時',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.createPosts(createPostDto);
  }

  // データ修正API
  @ApiOperation({
    summary: 'データ修正API',
    description: '定された postId のデータを修正する',
  })
  @ApiResponse({
    status: 201,
    description: '修正に成功した時',
    type: CreatPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '必須項目がクライアントから送られてきていない場合',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'postId', description: '投稿データID', type: 'number' })
  @Put(':postId')
  async update(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Posts> {
    return this.postsService.updatePosts(postId, updatePostDto);
  }

  // データ削除API
  @ApiOperation({
    summary: 'データ削除API',
    description: '指定された postId のデータを削除する',
  })
  @ApiResponse({
    status: 200,
    description: '削除に成功した時',
    type: CreatPostResponse,
  })
  @ApiResponse({
    status: 400,
    description: '指定された投稿データIDが存在しない場合',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
    type: ErrorResponse,
  })
  @ApiParam({ name: 'postId', description: '投稿データID', type: 'number' })
  @Delete(':postId')
  async delete(@Param('postId') postId: number): Promise<Posts> {
    return this.postsService.deletePosts(postId);
  }
}
