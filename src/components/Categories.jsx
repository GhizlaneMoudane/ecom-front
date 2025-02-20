import React from "react";

const Categories = () => {
  const categories = [
    { 
      name: "Food & Nutrition", 
      description: "Healthy & delicious options",
      img: "https://cdn-icons-png.flaticon.com/512/123/123292.png",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    { 
      name: "Beauty & Skincare", 
      description: "Luxury beauty essentials",
      img: "https://images.ctfassets.net/lm0nxqkzuy44/ndurY1i5EROokqXNlBB8B/ec5aa318bc2e4f2fa72c9fff4c2ebe12/brand_hero_269.jpg",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600"
    },
    { 
      name: "Home & Living", 
      description: "Elevate your living space",
      img: "https://m.media-amazon.com/images/I/71TjwykkDQL._AC_UF894,1000_QL80_.jpg",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    { 
      name: "Lifestyle", 
      description: "Curated for modern living",
      img: "https://images.squarespace-cdn.com/content/v1/58fd82dbbf629ab224f81b68/1668059914265-XVQH6MZQUJN2HGD8BQIN/Made-in-Japan-Nov-22.jpg",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated collections from top brands across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <div className="relative h-80 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  {category.description}
                </p>
                <div className="overflow-hidden">
                  <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 delay-100">
                    Explore collection
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;