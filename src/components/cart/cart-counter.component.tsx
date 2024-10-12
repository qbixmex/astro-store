import styles from './cart-counter.module.css';
import CartIcon from './cart-icon.component';

const CartCounter = () => {
  return (
    <a href="/cart" className={styles.cartLink}>
      <span className={styles.cartCounter}>5</span>
      <CartIcon size={28} />
    </a>
  );
};

export default CartCounter;