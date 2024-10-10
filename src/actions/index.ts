import { loginUser, logoutSession, registerUser } from './auth';
import { getProductsByPage } from './products';

export const server = {
  //* Products
  getProductsByPage,

  //* Auth
  loginUser,
  logoutSession,
  registerUser,
};
