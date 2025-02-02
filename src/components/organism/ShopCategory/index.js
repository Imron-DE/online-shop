import Image from "next/image";
import React from "react";

const ShopCategory = ({ category }) => {
  const banners = {
    "men's clothing": "/assets/banner_mens.png",
    "women's clothing": "/assets/banner_women.png",
    electronics: "/assets/banner_mens.png",
    jewelery: "/assets/banner_women.png",
  };

  return (
    <div className="w-full h-full">
      {/* Banner */}
      <div className="relative w-full h-full  bg-gray-200 flex items-center justify-center">
        <Image src={banners[category] || "/assets/banner_women.png"} alt={`Banner ${category}`} className="w-full h-full object-cover" width={1000} height={500} priority />
      </div>

      {/* Sorting & Product Info */}
      <div className="flex flex-wrap justify-between items-center rounded-lg p-4 mt-6">
        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-gray-800">1-12</span> dari 36 produk
        </p>
        <button className="flex items-center gap-2 text-gray-700 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition">
          <span className="text-sm">Sort by</span>
          <Image src="/assets/dropdown_icon.png" alt="Sort Dropdown" width={20} height={20} className="opacity-80" />
        </button>
      </div>
    </div>
  );
};

export default ShopCategory;
