// Menambahkan module dotenv dan melakukan konfigurasi untuk menggunakan module dotenv agar dapat membaca variabel yang ditulis pada file ".env"
import dotenv from "dotenv";
dotenv.config();

export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "";
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";