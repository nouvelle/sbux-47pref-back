import { ApiProperty } from '@nestjs/swagger';
import { PrefDto } from './pref-dto';
import { PostsDto } from './posts-dto';

export class StoreDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  store_name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  office_hour: string;

  @ApiProperty()
  wifi: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  listed: boolean;

  @ApiProperty()
  transaction_date: Date;

  @ApiProperty()
  pref_id: number;
}

export class StorePrefPostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  store_name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  office_hour: string;

  @ApiProperty()
  wifi: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  listed: boolean;

  @ApiProperty()
  transaction_date: Date;

  @ApiProperty()
  pref_id: number;

  @ApiProperty()
  pref: PrefDto;

  @ApiProperty()
  posts: PostsDto;
}

export class StorePrefDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  store_name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  office_hour: string;

  @ApiProperty()
  wifi: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  listed: boolean;

  @ApiProperty()
  transaction_date: Date;

  @ApiProperty()
  pref_id: number;

  @ApiProperty()
  pref: PrefDto;
}
