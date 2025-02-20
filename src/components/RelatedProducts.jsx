import React from "react";

const relatedProducts = [
  {
    name: "Zip Tote Basket",
    color: "White and Black",
    price: "$140",
    image:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-01.jpg",
  },
  {
    name: "Zip High Wall Tote",
    color: "White and Blue",
    price: "$150",
    image:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-02.jpg",
  },
  {
    name: "Halfsize Tote",
    color: "Clay",
    price: "$210",
    image:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-03.jpg",
  },
];

function RelatedProducts() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customers also bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.color}</p>
            <p className="text-lg font-bold text-gray-900">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
