import { config } from 'dotenv';
config();

export const S3Config = {
  region: process.env.YANDEX_S3_REGION,
  bucketName: process.env.YANDEX_S3_BUCKET,
  credentials: {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY,
    secretAccessKey: process.env.YANDEX_S3_SECRET_KEY,
  },
  endpoint: process.env.YANDEX_S3_ENDPOINT,
};
