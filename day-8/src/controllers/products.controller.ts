import mongoose from "mongoose";  
import { Request, Response } from "express";
import Product from "@/models/products.model";
import Category from "@/models/categories.model";

export default {
  async create(req: Request, res: Response) {
    try {
      // Cek apabila sudah ada product dengan nama yang hendak dibuat
      const product = await Product.findOne({
        name: req.body.name,
      });

      // Apabila sudah ada product dengan nama yang sama, maka return error dengan pesan bahwa product dengan nama yang hendak dibuat sudah ada
      if (product) {
        return res.status(400).json({
          message: "Create product failed",
          detail: `product with name '${req.body.name}' already exist`,
        });
      }
      // Ambil category id dari request body
      const { categoryId } = req.body;

      if (categoryId) {
        const category = await Category.findById(categoryId);
  
        if (!category) {
          return res.status(404).json({
            message: "Create product failed",
            detail: "Category not found with the given category id",
          });
        }
      } else {
        return res.status(404).json({
          message: "Create product failed",
          detail: "Category id field cannot be empty",
        });
      }
      // Cari category yang telah ada di database, jika tidak ditemukan return create product error dengan pesan id category tidak ditemukan

      // Jika id category ditemukan maka dilanjutkan dengan create product berdasarkan req.body
      const newProduct = await Product.create(req.body);
      
      // Untuk dapat menggunakan relasi one to many dengan category maka id product perlu dimasukan kedalam field products di category yang ditentukan dalam detail product (dengan menggunakan $push)
      await Category.findByIdAndUpdate(
        categoryId,
        { $push: {products: newProduct._id} },
        { new: true, useFindAndModify: false },
      )

      res.status(201).json({
        message: "Success create product",
        data: newProduct,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed create product",
        detail: err.message,
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const products = await Product.find();

      res.status(200).json({
        message: "Success get all products",
        data: products,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed get all products",
        detail: err.message,
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      // Cari product yang telah ada di database, jika tidak ditemukan return error dengan pesan id product tidak ditemukan
      const product = await Product.findOne({
        _id: req.params.id,
      });

      if (!product) {
        return res.status(404).json({
          message: "Failed get product by id",
          detail: "Product not found with the given id",
        });
      }

      res.status(200).json({
        message: "Success get product by id",
        data: product,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed get product by id",
        data: err.message,
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      // Mencari product dengan nama yang diinputkan pada request body, jika nama sudah ada (selain dari nama dari product yang hendak diupdate sekarang), maka erturn error dengan pesan bahwa nama product yang hendak diperbarui sudah ada
      const existingProduct = await Product.findOne({
        name: req.body.name,
        _id: { $ne: req.params.id }
      });

      if (existingProduct) {
        return res.status(404).json({
          message: "Failed update product",
          detail: `Product with name '${req.body.name}' already exist`,
        });
      }

      const { categoryId } = req.body;

      // Cek apakah di request body juga menyertakan kategory id
      if (categoryId) {
        const category = await Category.findById(categoryId);
        
        // Cari category yang telah ada di database, jika tidak ditemukan return create product error dengan pesan id category tidak ditemukan
        if (!category) {
          return res.status(404).json({
            message: "Create product failed",
            detail: "Category not found with the given category id",
          });
        }
      }

      const product = await Product.findOneAndUpdate(
        { _id: req.params.id }, // query product dengan id sesuai parameter
        req.body, // field yang akan diupdate
        {
          new: true,
        }
      );

      // Jika hasil findOneAndUpdate kosong (berarti product dengan id di parameter tidak ditemukan) return error dengan pesan bahwa id product tidak ditemukan
      if (!product) {
        return res.status(404).json({
          message: "Failed update product",
          detail: "Product not found with the given id",
        });
      } else {
        // Kondisi ketika categories null (setelah ada penghapusan categories setelah membuat product), maka id product perlu dimasukan kedalam field products di category yang ditentukan dalam detail product (dengan menggunakan $push) 
        const categoriesFound = await Category.findById(categoryId);
        if (categoriesFound) {
          const productExistInCategory = categoriesFound.products.includes(product._id);
          if (!productExistInCategory) {
            categoriesFound.products.push(product._id);
            await categoriesFound.save();
          }
        }
      }

      res.status(200).json({
        message: "Success update product",
        data: product,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed update product",
        data: err.message,
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
      });

      // Jika hasil findOneAndDelete kosong (berarti product dengan id di parameter tidak ditemukan) return error dengan pesan bahwa id product tidak ditemukan
      if (!product) {
        return res.status(404).json({
          message: "Failed delete product",
          detail: "Product not found with the given id",
        });
      }

      // Menghapus relasi product yang dihapus dengan category yang tercantum pada detail produk
      await Category.updateOne(
        { _id: product.categoryId },
        { $pull: { products: product._id } }
      );

      res.status(200).json({
        message: "Success delete product",
        data: product,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed delete product",
        data: err.message,
      });
    }
  },
};
