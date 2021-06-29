import { ApiProperty } from '@nestjs/swagger';

export class PrefDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nameJP: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  zoom: number;

  @ApiProperty()
  clusterZoom: number;

  @ApiProperty()
  drink: string;

  @ApiProperty()
  is_post: boolean;
}
