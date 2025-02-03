import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/templates/layout";
import CardProduct from "@/components/molecule/CardProduct";
import ShopCategory from "@/components/organism/ShopCategory";

const ProductCategoryPage = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const api = process.env.NEXT_PUBLIC_API;
  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "";

  useEffect(() => {
    if (!categoryName) return;

    const fetchProductsByCategory = async () => {
      try {
        const formattedCategory = decodeURIComponent(categoryName);
        const res = await fetch(`${api}/products/category/${formattedCategory}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductsByCategory();
  }, [categoryName, api]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <ShopCategory category={decodedCategory} />
      <div className="flex px-5 py-8">
        <div className="flex flex-col w-full justify-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {products?.map((item) => (
              <CardProduct key={item.id}>
                <CardProduct.Header image={item.image} link={`/product/${item.id}`} />
                <CardProduct.Body title={item.title} desc={item.description} link={`/product/${item?.id}`} />
                <CardProduct.Footer price={item.price} id={item.id} rating={item.rating} product={item} />
              </CardProduct>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategoryPage;
