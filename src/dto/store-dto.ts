import { ApiProperty } from '@nestjs/swagger';

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
