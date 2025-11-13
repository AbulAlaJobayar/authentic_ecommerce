/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";

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
  data: FormData
): Promise<CloudinaryResponse | UploadError> => {
  const uploadData = new FormData();
  uploadData.append("file", data as any);
  uploadData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );
  try {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary cloud name is not configured");
    }

    const response: AxiosResponse<CloudinaryResponse> = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      uploadData,

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

    return response.data;
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
