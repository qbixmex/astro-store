import type { CartItem } from "@/interfaces";
import Cookies from "js-cookie";

class CartCookiesClient {
  static getCart(): CartItem[] {
    return JSON.parse(Cookies.get("cart") || "[]");
  }

  static addItem(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const itemInCart = cart.find((item) => {
      return item.productId === cartItem.productId && item.size === cartItem.size;
    });

    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    Cookies.set("cart", JSON.stringify(cart));

    return cart;
  }

  static removeItem(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const updatedCart = cart.filter((item) => {
      return !((item.productId === cartItem.productId) && (item.size === cartItem.size));
    });

    Cookies.set("cart", JSON.stringify(updatedCart));

    return updatedCart;
  }
}

export default CartCookiesClient;
