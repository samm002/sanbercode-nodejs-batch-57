import { Product } from "./models/product";
import { User } from "./models/user";
import { Order } from "./models/order";
import * as productService from "./services/productService";
import * as userService from "./services/userService";
import * as orderService from "./services/orderService";
import { validate } from "./utils/validate";
import { productSchema } from "./schemas/productSchema";
import { userSchema } from "./schemas/userSchema";
import { orderSchema } from "./schemas/orderSchema";

let products: Product[] = [];
let users: User[] = [];
let orders: Order[] = [];

const newProduct: Product = {
  id: 1,
  name: "Laptop",
  description: "High performance laptop",
  price: 1500,
  category: "Electronics",
  stock: 100
};

if (validate(newProduct, productSchema)) {
  products = productService.addProduct(products, newProduct);
} else {
  console.log("Invalid product data");
}

const newUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
  address: "123 Main St"
};

if (validate(newUser, userSchema)) {
  users = userService.addUser(users, newUser);
} else {
  console.log("Invalid user data");
}

const newOrder: Order = {
  id: 1,
  userId: 1,
  products: [{ productId: 1, quantity: 1 }],
  totalAmount: 1500,
  orderDate: new Date(),
  status: "pending"
};

if (validate(newOrder, orderSchema)) {
  orders = orderService.placeOrder(orders, newOrder);
} else {
  console.log("Invalid order data");
}

console.log(productService.getProducts(products));
console.log(userService.getUsers(users));
console.log(orderService.getOrders(orders));

orders = orderService.updateOrderStatus(orders, 1, "shipped");
console.log(orderService.getOrders(orders));