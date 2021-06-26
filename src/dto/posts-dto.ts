import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PostsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  visited_date: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  secretkey: string;

  @ApiProperty()
  snshandle: string;

  @ApiProperty()
  tag: string;
}

export class CreatePostDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  comments: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  secretkey: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  snshandle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tag: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  pref_id?: number;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  comments: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  secretkey: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  snshandle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tag: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  pref_id?: number;
}
