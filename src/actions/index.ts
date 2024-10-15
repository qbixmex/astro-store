import { loginUser, logoutSession, registerUser } from './auth';
import { getProductsByPage, getProductBySlug, createUpdateProduct, deleteProductImage } from './products';
import loadProductsFromCart from './products/load-products-from-cart.action';

export const server = {
  //* Products
  getProductsByPage,
  getProductBySlug,
  loadProductsFromCart,
  createUpdateProduct,
  deleteProductImage,

  //* Auth
  loginUser,
  logoutSession,
  registerUser,
};
