// pages/index.js
import { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const api = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${api}/products/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, [api]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Categories</h1>
      <div className="flex justify-around mb-4">
        {categories.map((category, index) => (
          <Link key={index} href={`product/category/${category}`}>
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
