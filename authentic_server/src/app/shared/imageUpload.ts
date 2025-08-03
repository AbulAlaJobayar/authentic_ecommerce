import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../config';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

// AWS S3 Configuration
const awsConfig = {
  bucket: config.aws.bucket,
  region: config.aws.region,
  accessKey: config.aws.accessKey,
  secretKey: config.aws.secretAccess,
};

const s3 = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.accessKey,
    secretAccessKey: awsConfig.secretKey,
  },
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads');

    // Create 'uploads' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use a unique filename (timestamp + original name)
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Upload Image to S3
const uploadImageToS3 = async (file: MulterFile) => {
  try {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: awsConfig.bucket,
      Key: `${Date.now()}_${file.originalname}`, // Unique filename
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Delete the local file after upload
    fs.unlinkSync(file.path);

    // Return the S3 object URL
    return `https://${awsConfig.bucket}.s3.${awsConfig.region}.amazonaws.com/${params.Key}`;
  } catch (err) {
    console.error('S3 Upload Error:', err);
    // Delete the local file

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw err;
  }
};

export const imageUploader = {
  upload, // Multer middleware for handling file uploads
  uploadImageToS3, // Function to upload to S3
};
