import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable({
  providedIn: 'root',
})
export class AmazonService {
  bucketName = 'yours-doctor';
  region = 'ap-southeast-2';
  private accessKeyId = 'c/WsCCDI/oAqgUnF6VufSDyr9ZOmqWwup9xe5/8L';
  private secretAccessKey =
    'AKIA4DMVQNEU25VI36U2,nnJMz+ZERvDIlEbAVKhmFjcjPjM3ysI7xul7mMNP';

  http = inject(HttpClient);

  private s3Client = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
    logger: console,
  });

  async uploadFile(file: File): Promise<string> {
    const fileName = `images/${Date.now()}-${file.name}`;
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Generate pre-signed URL for secure uploads
  async getPresignedUrl(fileName: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      ContentType: 'image/jpeg',
    };

    const command = new PutObjectCommand(params);
    return getSignedUrl(this.s3Client, command, { expiresIn: 180 }); // URL valid for 60 seconds
  }



  listFolderContents() {
    const imageListUrl = 'https://yours-doctor.s3.ap-southeast-2.amazonaws.com/images-list.json';
    return this.http.get(imageListUrl, { responseType: 'blob' });
  }
  

  getImage() {}
}
