import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get('CLOUD_NAME'),
      api_key: config.get('CLOUD_API_KEY'),
      api_secret: config.get('CLOUD_API_SECRET'),
    });
  },
  inject: [ConfigService],
};
