import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    base64Encoded: string,
    public_id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const uploadResponse = await v2.uploader.upload(base64Encoded, {
      folder: 'fmh_clinic_images',
      phash: true,
      public_id,
    });
    return uploadResponse;
  }
}
