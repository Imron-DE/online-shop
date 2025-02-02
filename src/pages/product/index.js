import Layout from "@/components/templates/layout";
import { getProducts } from "@/service/products";
import React from "react";
import CardProduct from "@/components/molecule/CardProduct";

const ProductPage = ({ data }) => {
  return (
    <>
      <Layout>
        <div className="flex px-5 py-8">
          {/* products */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-blue-500 uppercase mb-4 text-center">Products</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {data?.map((item) => (
                <CardProduct key={item.id}>
                  <CardProduct.Header image={item.image} link={`/product/${item.id}`} />
                  <CardProduct.Body title={item.title} desc={item.description} link={`/product/${item?.id}`} />
                  {/* Pass rating data to Footer */}
                  <CardProduct.Footer price={item.price} id={item.id} rating={item.rating} />
                </CardProduct>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    const slicedProducts = await products.slice(0, 20);
    return {
      props: {
        data: slicedProducts || [],
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default ProductPage;
