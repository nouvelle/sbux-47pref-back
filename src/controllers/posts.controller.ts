import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';
import { PostsDto, CreatePostDto } from '../dto/posts-dto';
import { ErrorResponse, CreatPostResponse } from '../dto/response-dto';

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
    type: [PostsDto],
  })
  @ApiResponse({
    status: 500,
    description: 'サーバ側でサービスが提供できない場合',
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
  @Get()
  async getAllPref(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<Posts[]> {
    return this.postsService.getAllPosts(limit, offset);
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
}
