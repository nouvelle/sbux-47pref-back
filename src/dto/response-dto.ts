import { ApiProperty } from '@nestjs/swagger';

export class NormalResponse {
  @ApiProperty()
  private readonly result: string;

  constructor(result: string) {
    this.result = result;
  }
}

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
