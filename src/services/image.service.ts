import { Injectable } from '@nestjs/common';
import { Aws } from '../helpers/aws';

@Injectable()
export class ImageService {
  constructor(private readonly aws: Aws) {}

  async getImageList(): Promise<any> {
    return this.aws.getImageList();
  }

  async uploadFile(filename, filetype, data): Promise<any> {
    return this.aws.uploadFile(filename, filetype, data);
  }
}
