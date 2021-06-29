import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Aws } from '../helpers/aws';

@Injectable()
export class ImageService {
  constructor(private readonly aws: Aws) {}

  async getImageList(): Promise<any> {
    return await this.aws.getImageList().catch((err) => {
      if (err.code && err.statusCode) {
        throw new HttpException(err.code, err.statusCode);
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  async getOneImage(filename): Promise<any> {
    return await this.aws
      .getOneImage(filename)
      .then((data) => {
        return { data };
      })
      .catch((err) => {
        if (err.code && err.statusCode) {
          throw new HttpException(err.code, err.statusCode);
        } else {
          throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
  }

  async uploadFile(imgData, file): Promise<any> {
    return await this.aws.uploadFile(imgData, file).catch((err) => {
      if (err.code && err.statusCode) {
        throw new HttpException(err.code, err.statusCode);
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  async deleteFile(imgData): Promise<any> {
    return await this.aws.deleteFile(imgData).catch((err) => {
      if (err.code && err.statusCode) {
        throw new HttpException(err.code, err.statusCode);
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }
}
