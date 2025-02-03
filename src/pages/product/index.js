// ProductPage.js
import Layout from "@/components/templates/layout";
import { getProducts } from "@/service/products";
import React, { useState, useEffect } from "react";
import CardProduct from "@/components/molecule/CardProduct";
import ProductSearch from "@/components/organism/ProductSearch";

const ProductPage = ({ data, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState(data);

  // Fungsi untuk menangani pencarian dan filter produk
  const handleSearch = (query, minPrice, maxPrice, category) => {
    let filtered = data;

    if (query.trim()) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    filtered = filtered.filter((product) => (minPrice === "" || product.price >= parseFloat(minPrice)) && (maxPrice === "" || product.price <= parseFloat(maxPrice)));

    setFilteredProducts(filtered);
  };

  return (
    <Layout>
      <div className="flex px-5 py-8 ">
        <div className="flex flex-col w-full justify-center ">
          <h1 className="text-3xl font-bold text-blue-500 uppercase mb-4 text-center">Products</h1>
          <ProductSearch categories={categories} onSearch={handleSearch} />
          <div className="flex flex-wrap gap-4 justify-center">
            {filteredProducts?.map((item) => (
              <CardProduct key={item.id}>
                <CardProduct.Header image={item.image} link={`/product/${item.id}`} />
                <CardProduct.Body title={item.title} desc={item.description} link={`/product/${item.id}`} />
                <CardProduct.Footer price={item.price} id={item.id} rating={item.rating} product={item} link={`/product/${item.id}`} />
              </CardProduct>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    const slicedProducts = products.slice(0, 20);
    const api = process.env.NEXT_PUBLIC_API;

    // Ambil kategori dari API
    const categoriesRes = await fetch(`${api}/products/categories`);
    const categories = await categoriesRes.json();

    return {
      props: {
        data: slicedProducts || [],
        categories: categories || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: [], categories: [] },
    };
  }
}

export default ProductPage;
