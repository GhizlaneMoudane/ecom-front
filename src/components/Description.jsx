import React, { useState, useContext } from "react";
import CartContext from "../Context/CartContext";

const Description = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  
  const product = {
    id: "sunscreen-1", // Unique identifier for the product
    name: "Sunscreen spf 50 PA++++",
    brand: "Beauty of Joseon",
    price: 125,
    image: "/path-to-image.jpg" // Add the actual image path
  };

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleSubtract = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Product added to cart! Quantity: ${quantity}`);
  };

  return (
    <div className="w-1/2 max-lg:w-4/5">
      <h2 className="text-orange-500 font-bold text-sm">Beauty of Joseon</h2>
      <h1 className="text-4xl font-bold mt-4 mb-6">
        Sunscreen spf 50 PA++++
      </h1>
      <p className="text-gray-600 mb-6">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they’ll withstand everything
        the weather can offer.
      </p>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">$125.00</span>
          <span className="text-orange-500 bg-orange-100 px-2 py-1 rounded-md text-sm">
            50% OFF
          </span>
        </div>
        <p className="line-through text-gray-400">$250.00</p>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
          <button onClick={handleSubtract} className="text-xl font-bold">
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button onClick={handleAdd} className="text-xl font-bold">
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Description;
