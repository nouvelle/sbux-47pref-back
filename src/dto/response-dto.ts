import { ApiProperty } from '@nestjs/swagger';
import { PrefDto } from './pref-dto';

export class ErrorResponse {
  @ApiProperty()
  private readonly statusCode: number;
  @ApiProperty()
  private readonly message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class GetPostResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  comments: string | null;

  @ApiProperty()
  author: string;

  @ApiProperty()
  secretkey: string | null;

  @ApiProperty()
  snshandle: string | null;

  @ApiProperty()
  tag: string | null;

  @ApiProperty()
  pref: PrefDto;
}

export class CreatPostResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  image: string | null;

  @ApiProperty()
  comments: string | null;

  @ApiProperty()
  author: string;

  @ApiProperty()
  secretkey: string | null;

  @ApiProperty()
  snshandle: string | null;

  @ApiProperty()
  tag: string | null;

  @ApiProperty()
  pref?: { id: number };
}

export class GetAllImagesResponse {
  @ApiProperty()
  Key: string;

  @ApiProperty()
  LastModified: string;

  @ApiProperty()
  ETag: string;

  @ApiProperty()
  Size: number;

  @ApiProperty()
  StorageClass: string;

  @ApiProperty()
  Owner: {
    DisplayName: string;
    ID: string;
  };
}

export class GetImageResponse {
  @ApiProperty()
  data: string;
}

export class UploadImageResponse {
  @ApiProperty()
  ETag: string;

  @ApiProperty()
  Location: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  Key: string;

  @ApiProperty()
  Bucket: string;
}
