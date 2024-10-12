import { useStore } from "@nanostores/react";
import { itemsInCart } from "@/store";
import CartIcon from './cart-icon.component';
import EmptyCartIcon from './empty-cart-icon.component';
import styles from './cart-counter.module.css';
import { useEffect } from "react";
import { CartCookiesClient } from "@/utils";

const CartCounter = () => {
  const $itemsInCart = useStore(itemsInCart);

  
  useEffect(() => {
    const cart = CartCookiesClient.getCart();
    itemsInCart.set(cart.length);
  }, [])

  return (
    ($itemsInCart > 0) ? (
      <a href="/cart" className={styles.cartLink}>
        <span className={styles.cartCounter}>
          {$itemsInCart}
        </span>
        <CartIcon size={28} />
      </a>
    ) : (
      <span className={styles.emptyCart}>
        <EmptyCartIcon size={28} className={styles.disabledIcon} />
      </span>
    )
  );
};

export default CartCounter;