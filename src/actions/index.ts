import { loginUser, logoutSession, registerUser } from './auth';
import { getProductsByPage, getProductBySlug } from './products';
import loadProductsFromCart from './products/load-products-from-cart.action';

export const server = {
  //* Products
  getProductsByPage,
  getProductBySlug,
  loadProductsFromCart,

  //* Auth
  loginUser,
  logoutSession,
  registerUser,
};
