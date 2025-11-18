/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

interface UploadError {
  message: string;
  status?: number;
  details?: any;
}

const imageUploader = async (
  file: File
): Promise<CloudinaryResponse | UploadError> => {
  console.log();
  try {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary cloud name is not configured");
    }
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary cloud Preset is not configured");
    }
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Timeout after 30 seconds
        timeout: 30000,
      }
    );

    if (!response.data.secure_url) {
      throw new Error("No secure URL returned from Cloudinary");
    }

    return response.data.secure_url;
  } catch (error) {
    const axiosError = error as AxiosError;
    const uploadError: UploadError = {
      message:
        (axiosError.response?.data as { error?: { message: string } })?.error
          ?.message || "Image upload failed",
      status: axiosError.response?.status,
      details: axiosError.response?.data || axiosError.message,
    };

    console.error("Cloudinary upload error:", uploadError);
    return uploadError;
  }
};

export default imageUploader;
