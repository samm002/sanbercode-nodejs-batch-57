// Penambahan model category untuk tugas day 8

import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Isi dari model category hanyalah nama dan product (array, karena relasi one to many) 
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
