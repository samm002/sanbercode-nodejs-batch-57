import express from "express";

import { single, multiple } from "./middlewares/upload.middleware";
import { handleUpload } from "./utils/cloudinary"; // Import function handleUpload untuk upload file ke cloudinary

const router = express.Router();

router.post("/upload/single", single, async (req, res) => {
  try {
    // Check apakah ada file yang diupload
    if (!req.file) {
      return res.status(400).json({ 
        status: 400, 
        message: "File is Required" 
      });
    }

    // Panggil fungsi handleUpload untuk upload file ke cloudinary dengan parameter buffer dan orifinal dari req.file
    const result = await handleUpload(req.file.buffer, req.file.originalname);

    // Response jika request berhasil (file telah terupload)
    res.json({ 
      status: 200, 
      message: "Single File Upload Success", 
      result: result.secure_url 
    });
  } catch (error) {
    console.error("Error uploading file :", error);

    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/upload/multiple", multiple, async (req, res) => {
  try {
    // Check apakah ada file-file yang diupload
    if (!req.files) {
      return res.status(400).json({ 
        status: 400, 
        message: "File is Required" 
      });
    }

    // Melakukan type assertion untuk req.files sebagai array dari objek Express.Multer.File (untuk menghindari error pada saat loop keseluruhan req.files)
    const files = req.files as Express.Multer.File[];

    // Mendeklarasikan variabel untuk menampung url file yang telah diupload
    const uploadedUrls: string[] = [];
    
    // Loop seluruh file yang ada pada req.files
    for (const file of files) {
      // Untuk setiap file panggil fungsi handleUpload untuk upload file ke cloudinary dengan parameter buffer dan orifinal dari setiap file dari req.files
      const result = await handleUpload(file.buffer, file.originalname);

      // Push url hasil upload ke variabel uploadedUrls (Untuk keperluan ditampilkan pada response json)
      uploadedUrls.push(result.secure_url);
    }
    
    // Response jika request berhasil (file-file telah terupload)
    res.json({ 
      status: 200, 
      message: "Multiple File Upload Success", 
      result: uploadedUrls 
    });
  } catch (error) {
    console.error("Error uploading files :", error);

    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
