"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploader = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../config"));
// AWS S3 Configuration
const awsConfig = {
    bucket: config_1.default.aws.bucket,
    region: config_1.default.aws.region,
    accessKey: config_1.default.aws.accessKey,
    secretKey: config_1.default.aws.secretAccess,
};
const s3 = new client_s3_1.S3Client({
    region: awsConfig.region || "us-east-1",
    credentials: {
        accessKeyId: awsConfig.accessKey || "123e2q4e5r4e",
        secretAccessKey: awsConfig.secretKey || "1w4weee45d34t66",
    },
});
// Multer Storage Configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path_1.default.join(process.cwd(), 'uploads');
        // Create 'uploads' directory if it doesn't exist
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Use a unique filename (timestamp + original name)
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// Upload Image to S3
const uploadImageToS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileStream = fs_1.default.createReadStream(file.path);
        const params = {
            Bucket: awsConfig.bucket,
            Key: `${Date.now()}_${file.originalname}`, // Unique filename
            Body: fileStream,
            ContentType: file.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        // Delete the local file after upload
        fs_1.default.unlinkSync(file.path);
        // Return the S3 object URL
        return `https://${awsConfig.bucket}.s3.${awsConfig.region}.amazonaws.com/${params.Key}`;
    }
    catch (err) {
        console.error('S3 Upload Error:', err);
        // Delete the local file
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        throw err;
    }
});
exports.imageUploader = {
    upload, // Multer middleware for handling file uploads
    uploadImageToS3, // Function to upload to S3
};
