import { Request, Response } from "express";
import Product from "@/models/products.model";
import Category from "@/models/categories.model";

export default {
  async create(req: Request, res: Response) {
    try {
      // Cek apabila sudah ada categories dengan nama yang hendak dibuat
      const category = await Category.findOne({
        name: req.body.name,
      });

      // Apabila sudah ada categories dengan nama yang sama, maka return error dengan pesan bahwa categories dengan nama yang hendak dibuat sudah ada
      if (category) {
        return res.status(400).json({
          message: "Create category failed",
          detail: `Category with name '${req.body.name}' already exist`,
        });
      }

      const newCategory = await Category.create(req.body);

      res.status(201).json({
        message: "Success create category",
        data: newCategory,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed create category",
        detail: err.message,
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      // Mencari seluruh categories beserta relasi products yang ada pada masing-masing categories
      const categories = await Category.find().populate("products");

      res.status(200).json({
        message: "Success get all categories",
        data: categories,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed get all categories",
        detail: err.message,
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      // Cari category yang telah ada di database, jika tidak ditemukan return error dengan pesan id category tidak ditemukan
      const category = await Category.findOne({
        _id: req.params.id,
      });

      if (!category) {
        return res.status(404).json({
          message: "Failed get category by id",
          detail: "Category not found with the given id",
        });
      }

      res.status(200).json({
        message: "Success get category by id",
        data: category,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed get category by id",
        data: err.message,
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      // Mencari category dengan nama yang diinputkan pada request body, jika nama sudah ada (selain dari nama dari category yang hendak diupdate sekarang), maka erturn error dengan pesan bahwa nama category yang hendak diperbarui sudah ada
      const existingCategory = await Category.findOne({
        name: req.body.name,
        _id: { $ne: req.params.id }
      });

      if (existingCategory) {
        return res.status(404).json({
          message: "Failed update category",
          detail: `Category with name '${req.body.name}' already exist`,
        });
      }

      const category = await Category.findOneAndUpdate(
        { _id: req.params.id }, // query category dengan id sesuai parameter
        req.body, // field yang akan diupdate
        {
          new: true,
        }
      );

      // Jika hasil findOneAndUpdate kosong (berarti category dengan id di parameter tidak ditemukan) return error dengan pesan bahwa id category tidak ditemukan
      if (!category) {
        return res.status(404).json({
          message: "Failed update category",
          detail: "Category not found with the given id",
        });
      }

      res.status(200).json({
        message: "Success update category",
        data: category,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Failed update category",
        data: err.message,
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const category = await Category.findOneAndDelete({
        _id: req.params.id,
      });

      // Jika hasil findOneAndDelete kosong (berarti product dengan id di parameter tidak ditemukan) return error dengan pesan bahwa id product tidak ditemukan
      if (!category) {
        return res.status(404).json({
          message: "Failed delete category",
          detail: "Category not found with the given id",
        });
      }

      // Menghapus relasi dengan product, setiap value dari field productId (yang memiliki id yang sama dengan category yang dihapus) pada product akan diubah menjadi null
      await Product.updateMany(
        { categoryId: req.params.id },
        { $set: { categoryId: null } }
        // Ini merupakan opsi untuk menghapus field category secara langsung dari data product
        // { $unset: { categoryId: 1 } }
      );

      res.status(200).json({
        message: "Success delete category",
        data: category,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Failed delete category",
        data: err.message,
      });
    }
  },
};
