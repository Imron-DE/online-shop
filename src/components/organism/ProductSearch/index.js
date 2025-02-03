// ProductSearch.js
import Button from "@/components/atoms/Button";
import { useState } from "react";

const ProductSearch = ({ onSearch, categories }) => {
  const [query, setQuery] = useState(""); // Pencarian berdasarkan title
  const [minPrice, setMinPrice] = useState(""); // Harga minimum
  const [maxPrice, setMaxPrice] = useState(""); // Harga maksimum
  const [category, setCategory] = useState(""); // Kategori produk

  const handleSearch = () => {
    onSearch(query, minPrice, maxPrice, category);
  };

  return (
    <div className="flex justify-center items-center mb-5 ">
      <div className=" w-full max-w-2xl bg-white p-6  rounded-lg ">
        {/* Input pencarian berdasarkan title */}
        <input type="text" placeholder="Cari berdasarkan nama..." value={query} onChange={(e) => setQuery(e.target.value)} className="border p-2 rounded w-full mb-2" />

        {/* Rentang harga */}
        <div className="flex gap-2 mb-2">
          <input type="number" placeholder="Harga Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border p-2 rounded w-1/2" />
          <input type="number" placeholder="Harga Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border p-2 rounded w-1/2" />
        </div>

        {/* Dropdown kategori */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full mb-4">
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Tombol untuk mencari */}
        <Button onClick={handleSearch} buttonClassname="bg-blue-500 text-white p-2 rounded w-full">
          Cari
        </Button>
      </div>
    </div>
  );
};

export default ProductSearch;
