import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async convertImageToCloudinary(image: any): Promise<any> {
    return v2.uploader.upload(
      image,
      { upload_preset: 'pv5ptgle' },
      (error, result) => {
        if (result) {
          return result.url;
        } else {
          return error;
        }
      },
    );
  }
}
