import React from "react";

const Spotlight = () => {
  const brands = [
    { name: "Brand 1", img: "https://placehold.co/200x200?text=Brand+1" },
    { name: "Brand 2", img: "https://placehold.co/200x200?text=Brand+2" },
    { name: "Brand 3", img: "https://placehold.co/200x200?text=Brand+3" },
    { name: "Brand 4", img: "https://placehold.co/200x200?text=Brand+4" },
  ];

  const products = [
    { name: "Product 1", img: "https://placehold.co/400x300?text=Product+1" },
    { name: "Product 2", img: "https://placehold.co/400x300?text=Product+2" },
    { name: "Product 3", img: "https://placehold.co/400x300?text=Product+3" },
    { name: "Product 4", img: "https://placehold.co/400x300?text=Product+4" },
  ];

  return (
    <section className="p-4">
      {/* Brands Spotlight */}
      <div className="brands mb-12">
        <h2 className="text-2xl font-bold mb-6">Brands Spotlight</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store of the Week */}
      <div className="store-week">
        <h2 className="text-2xl font-bold mb-6">Store of the Week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {/* Optional: Badge or Tag */}
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sale
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              </div>
               <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
        Add to Cart
      </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
