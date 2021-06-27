import { Injectable } from '@nestjs/common';
import { Aws } from '../helpers/aws';

@Injectable()
export class ImageService {
  constructor(private readonly aws: Aws) {}

  async getImageList(): Promise<any> {
    return this.aws.getImageList();
  }

  async getOneImage(filename): Promise<any> {
    return this.aws.getOneImage(filename).then((data) => {
      return { data };
    });
  }

  async uploadFile(imgData, file): Promise<any> {
    return this.aws.uploadFile(imgData, file);
  }

  async deleteFile(imgData): Promise<any> {
    return this.aws.deleteFile(imgData);
  }
}
