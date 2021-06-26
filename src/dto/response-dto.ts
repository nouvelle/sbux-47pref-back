import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  store?: { id: number };
}
