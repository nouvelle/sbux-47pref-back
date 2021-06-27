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
  async getOneImage(filename: string): Promise<Buffer | null> {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        { Bucket: this.bucketName, Key: filename },
        (err, data) => {
          if (err) return reject(err);
          resolve(data.Body.toString('base64'));
        },
      );
    });
  }

  /**
   * S3: 画像保存
   */
  async uploadFile(imgData: string, file: any): Promise<Buffer | null> {
    const params = {
      Bucket: this.bucketName,
      Body: file.buffer,
      ContentType: file.mimetype,
      Key: `${imgData}`,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  /**
   * S3: 画像削除
   */
  async deleteFile(imgData: string): Promise<any> {
    const params = {
      Bucket: this.bucketName,
      Key: `${imgData['imgData']}`,
    };
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}
