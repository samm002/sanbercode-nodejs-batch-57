import { Order } from "../models/order";

export const placeOrder = (orders: Order[], newOrder: Order): Order[] => {
  return [...orders, newOrder];
};

export const cancelOrder = (orders: Order[], orderId: number): Order[] => {
  return orders.filter(order => order.id !== orderId);
};

export const updateOrderStatus = (orders: Order[], orderId: number, status: "pending" | "shipped" | "delivered"): Order[] => {
  return orders.map(order =>
    order.id === orderId ? { ...order, status } : order
  );
};

export const getOrders = (orders: Order[]): Order[] => {
  return orders;
};