import { loginUser, logoutSession, registerUser } from './auth';
import { getProductsByPage, getProductBySlug } from './products';

export const server = {
  //* Products
  getProductsByPage,
  getProductBySlug,

  //* Auth
  loginUser,
  logoutSession,
  registerUser,
};
