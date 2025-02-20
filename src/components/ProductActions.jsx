import React from "react";

function ProductActions() {
  return (
    <div className="space-y-4">
      <select
        className="w-full border border-gray-300 rounded-lg p-2"
        defaultValue=""
      >
        <option value="" disabled>
          Choose Your Size
        </option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <div className="flex gap-4">
        <button className="w-full bg-blue-500 text-white rounded-lg py-2">
          Add To Cart
        </button>
        <button className="w-full bg-purple-600 text-white rounded-lg py-2">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductActions;
