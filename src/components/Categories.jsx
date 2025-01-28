import React from "react";

const Categories = () => {
  const categories = [
    { name: "Food", img: "https://cdn-icons-png.flaticon.com/512/123/123292.png" },
    { name: "Beauty", img: "https://images.ctfassets.net/lm0nxqkzuy44/ndurY1i5EROokqXNlBB8B/ec5aa318bc2e4f2fa72c9fff4c2ebe12/brand_hero_269.jpg" },
    { name: "Home", img: "https://m.media-amazon.com/images/I/71TjwykkDQL._AC_UF894,1000_QL80_.jpg" },
    { name: "Lifestyle", img: "https://images.squarespace-cdn.com/content/v1/58fd82dbbf629ab224f81b68/1668059914265-XVQH6MZQUJN2HGD8BQIN/Made-in-Japan-Nov-22.jpg" },
  ];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
