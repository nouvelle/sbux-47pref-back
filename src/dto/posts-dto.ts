import { ApiProperty } from '@nestjs/swagger';

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
  tag: boolean;
}
