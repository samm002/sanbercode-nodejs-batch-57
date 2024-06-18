const express = require('express');
const app = express();
const port = 3000;

let categories = [
  { id: 1, name: 'Electronic'},
  { id: 2, name: 'Furniture'},
];

let products = [
  { id: 1, name: 'Laptop', category: 'Electronic' },
  { id: 2, name: 'Phone', category: 'Electronic' },
];

app.use(express.json());

const categoryFormat = (category) => ({
  id: category.id,
  name: category.name,
});

const productFormat = (product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
});

app.get('/', (req, res) => {
  res.send('Welcome to my E Commerce!');
});

// Products Route (Referensi Materi)

// GET semua product
/* route ini dinonaktifkan karena bertabrakan dengan soal no 6
app.get('/api/products', (req, res) => {
  const mappedProducts =  products.map((product) => productFormat(product));
  const sortedMappedProducts = mappedProducts.sort((product1, product2) => product1.id - product2.id);
  res.json(sortedMappedProducts);
});
*/

// GET product berdasarkan id
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);

  if (product) {
    res.json(productFormat(product));
  } else {
    res.status(404).json({ message: `Product with id '${productId}' not found`})
  }
});

// POST product baru
app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  const existingCategoryName = categories.find(category => category.name === newProduct.category);
  
  if (!existingCategoryName) {
    return res.status(400).json({ message: `Category with name '${newProduct.category}' doesn't exist`});
  }

  const existingProductName = categories.find(product => product.name === newProduct.name);

  if (existingProductName) {
    return res.status(400).json({ message: `Product with name '${newProduct.name}' already exist`});
  }

  if (newProduct.id) {
    const existingproductId = products.find(product => product.id === newProduct.id);
    if (existingproductId) {
      return res.status(400).json({ message: `Product with id '${newProduct.id}' already exist`});
    }
  } else {
      newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  }
  products.push(newProduct);
  res.status(201).json(productFormat(newProduct));
});

// PUT (update) product berdasarkan id
app.put('/api/products/:id', (req, res) => { 
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    let { name, category } = req.body;
    category = category ?? products[productIndex].category;
    products[productIndex] = { id:productId, name, category };

    const existingCategoryName = categories.find(category => category.name === products[productIndex].category);
  
    if (!existingCategoryName) {
      return res.status(400).json({ message: `Category with name '${products[productIndex].category}' doesn't exist`});
    }

    res.json(productFormat(products[productIndex]));
  } else {
    res.status(404).json({ message: `Product with id '${productId}' not found`})
  }
});

// Delete product berdasarkan id
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    products = products.filter(product => product.id !== productId);
    res.status(204).send();
  } else {
    res.status(404).json({ message: `Product with id '${productId}' not found`})
  }
});

// Categories Route (Jawaban Tugas)

// 1. Route GET yang mengembalikan daftar semua kategori produk
app.get('/api/categories', (req, res) => {
  const mappedCategories = categories.map((category) => categoryFormat(category));
  const sortedMappedCategories = mappedCategories.sort((category1, category2) => category1.id - category2.id);
  res.json(sortedMappedCategories);
});


// 2. Route GET yang mengembalikan detail kategori berdasarkan ID.
app.get('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find(category => category.id === categoryId);

  if (category) {
    res.json(categoryFormat(category));
  } else {
    res.status(404).json({ message: `Category with id '${categoryId}' not found`})
  }
});

// 3. Route POST yang menambahkan kategori baru ke array
app.post('/api/categories', (req, res) => {
  const newCategory = req.body;

  const existingCategoryName = categories.find(category => category.name === newCategory.name);

  if (existingCategoryName) {
    return res.status(400).json({ message: `Category with name '${newCategory.name}' already exist`});
  }

  if (newCategory.id) {
    const existingCategoryId = categories.find(category => category.id === newCategory.id);
    if (existingCategoryId) {
      return res.status(400).json({ message: `Category with id '${newCategory.id}' already exist`});
    }
  } else {
      newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
  }
  categories.push(newCategory);
  res.status(201).json(categoryFormat(newCategory));
});

// 4. route PUT yang memperbarui kategori berdasarkan ID
app.put('/api/categories/:id', (req, res) => { 
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex(category => category.id === categoryId);
  if (categoryIndex !== -1) {
    categories[categoryIndex] = { id: categoryId, ...req.body };
    res.json(categoryFormat(categories[categoryIndex]));
  } else {
    res.status(404).json({ message: `Category with id '${categoryId}' not found`});
  }
});

// 5. Route DELETE yang menghapus kategori berdasarkan ID
app.delete('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex(category => category.id === categoryId);
  if (categoryIndex !== -1) {
    categories = categories.filter(category => category.id !== categoryId);
    res.status(204).send();
  } else {
    res.status(404).json({ message: `category with id '${categoryId}' not found`})
  }
});

// 6. Route GET dengan query string untuk mencari produk berdasarkan nama
app.get('/api/products', (req, res) => {
  const name = req.query.name;

  if (name) {
    const product = products.find(product => product.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    
    if (product) {
      res.json(productFormat(product));
    } else {
      res.status(404).json({ message: `Product with name '${name}' not found`})
    }
  } else {
    const mappedProducts =  products.map((product) => productFormat(product));
    const sortedMappedProducts = mappedProducts.sort((product1, product2) => product1.id - product2.id);
    res.json(sortedMappedProducts);
  }
});

// 7. Route GET dengan parameter dan query string untuk mendapatkan produk dalam kategori tertentu dan mencari berdasarkan nama
app.get('/api/categories/:name/product', (req, res) => {
  const categoryName = req.params.name;
  const productName = req.query.name;
  const category = categories.find(category => category.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase());

  if (category) {
    const productsFound = products.filter(product => category.name === product.category);

    if(productsFound.length > 0) {
      let mappedProducts;

      if (productName) {
        const productsFoundByName = productsFound.filter(product => product.name.toLocaleLowerCase() === productName.toLocaleLowerCase());
        mappedProducts = productsFoundByName.map((product) => productFormat(product));
      } else {
        mappedProducts = productsFound.map((product) => productFormat(product));
      }
      return res.json(mappedProducts);
    } else {
      return res.status(404).json({ message: `Product with name '${productName}' not found in '${category.name}' category`});
    }
  } else {
    res.status(404).json({ message: `Category with name '${categoryName}' not found`});
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});