import { v2 as cloudinary  } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Semula parameter adalah string, diganti menjadi buffer karena multer hanya menyimpan file di memorystorage
// Ditambahkan juga tambahan parameter untuk mengatur nama file berdasarkan nama file asli ketika di upload
export const handleUpload = async (buffer: Buffer, originalFileName: string): Promise<any> => {
  const fileName = originalFileName.replace(/\.[^.#]+$/, "").replace(/[^a-zA-Z0-9-]+/g, ""); // Menghilangkan ekstensi file dan simbol lain dari file agar dapat dijadikan public_id
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        resource_type: "auto",
        folder:"sanbercode_nodejs_batch57_tugasDay7",
        public_id: fileName,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};


export default cloudinary;
