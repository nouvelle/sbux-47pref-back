import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class Aws {
  s3: any;
  bucketName: string;
  constructor(private readonly config: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.config.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.config.get('AWS_SECRET_KEY'),
    });
    this.bucketName = this.config.get('AWS_BUCKET');
  }
  // constructor(private readonly config: ConfigService) {
  //   aws.config.update({
  //     accessKeyId: this.config.get('AWS_ACCESS_KEY'),
  //     secretAccessKey: this.config.get('AWS_SECRET_KEY'),
  //     region: 'ap-northeast-1',
  //   });
  //   this.s3 = new aws.S3();
  //   this.bucketName = this.config.get('AWS_BUCKET');
  // }

  /**
   * S3: 全画像取得
   */
  async getImageList(): Promise<Buffer | null> {
    return new Promise((resolve, reject) => {
      this.s3.listObjects({ Bucket: this.bucketName }, (err, data) => {
        if (err) return reject(err);
        resolve(data.Contents);
      });
    });
  }

  /**
   * S3: 特定の画像取得
   */
  async getOneImage(
    id: string,
    prefId: string,
    filename: string,
  ): Promise<Buffer | null> {
    let key;
    if (prefId) {
      key = `${id}_${prefId}_${filename}`;
    } else {
      key = `${id}/${filename}`;
    }
    return new Promise((resolve, reject) => {
      this.s3.getObject({ Bucket: this.bucketName, Key: key }, (err, data) => {
        if (err) return reject(err);
        resolve(data.Body.toString('base64'));
      });
    });
  }

  /**
   * S3: 画像保存
   */
  async uploadFile(
    filename: string,
    filetype: string,
    query: any,
  ): Promise<Buffer | null> {
    const params = {
      Bucket: this.bucketName,
      ContentType: filetype,
    };
    if (query.prefId) {
      params['Key'] = `${query.id}_${query.prefId}_${filename}`;
    } else {
      params['Key'] = `${query.id}_${filename}`;
    }
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}
