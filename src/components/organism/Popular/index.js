import React, { useEffect, useState } from "react";
import CardProduct from "@/components/molecule/CardProduct";
import { getProducts } from "@/service/products";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();

        // Pastikan rating.rate digunakan untuk sorting
        const topRatedProducts = allProducts
          .map((item) => ({
            ...item,
            rating: parseFloat(item.rating?.rate) || 0, // Ambil rating.rate, jika tidak ada set ke 0
          }))
          .sort((a, b) => b.rating - a.rating) // Urutkan dari rating tertinggi ke terendah
          .slice(0, 4); // Ambil 10 produk dengan rating tertinggi
        setProducts(topRatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 justify-center mt-10 mb-10">
      <h1 className="text-[#171717] text-[50px] font-semibold">FLASH SALE</h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525] " />
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((item) => (
          <CardProduct key={item.id}>
            <CardProduct.Header image={item.image} link={`/product/${item.id}`} />
            <CardProduct.Body title={item.title} desc={item.description} link={`/product/${item.id}`} />
            <CardProduct.Footer price={item.price} id={item.id} rating={item.rating} />
          </CardProduct>
        ))}
      </div>
    </div>
  );
};

export default Popular;
