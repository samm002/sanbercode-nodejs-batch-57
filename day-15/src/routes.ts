import express from "express";

import aclMiddleware from "./middlewares/acl.middleware";
import authMiddleware from "./middlewares/auth.middleware";
import uploadMiddleware from "./middlewares/upload.middleware";
import authController from "./controllers/auth.controller";
import categoriesController from "./controllers/categories.controller";
import productsController from "./controllers/products.controller";
import uploadController from "./controllers/upload.controller";

const router = express.Router();

// Authentication routes
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", [authMiddleware, aclMiddleware(["admin"])], authController.me);

/*
Jawaban mini challenge : 
Untuk bisa mendapatkan data user dengan roles "user", maka perlu ditambahkan parameter pada middleware ACL untuk memperbolehkan roles "user" mengakses route "/auth/me"
router.get("/auth/me", [authMiddleware, aclMiddleware(["admin", "user"])], authController.me);
*/

router.put("/auth/profile", authController.profile);

// Products routes
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// Categories routes
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

export default router;
