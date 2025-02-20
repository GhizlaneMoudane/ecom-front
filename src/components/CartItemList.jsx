import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../Context/CartContext';

const CartItemList = () => {
  const { items } = useCart();

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemList;