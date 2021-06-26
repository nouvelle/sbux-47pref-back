import { ApiProperty } from '@nestjs/swagger';

export class PrefDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
