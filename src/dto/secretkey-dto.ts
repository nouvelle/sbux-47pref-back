import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckSecretkeyDto {
  @IsString()
  @ApiProperty()
  key: string;
}
