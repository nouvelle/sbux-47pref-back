import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @ApiProperty()
  drink?: string;
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

export class CheckSecretkeyDto {
  @IsString()
  @ApiProperty()
  key: string;
}
