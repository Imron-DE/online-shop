import { getProductById } from "@/service/products";
import React from "react";
import CardProduct from "@/components/molecule/CardProduct";
import Layout from "@/components/templates/layout";

const ProductDetailPage = ({ detailProduct }) => {
  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row gap-4 p-4 mt-20 mb-40">
          {/* Gambar Produk */}
          <div className="w-full md:w-1/2 flex justify-center items-center border-2 border-gray-300 rounded-lg shadow-md p-3">
            <CardProduct.Header image={detailProduct?.image} className="w-48 md:w-64 lg:w-80" />
          </div>

          {/* Detail Produk */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <CardProduct.Body title={detailProduct?.title} desc={detailProduct?.description} className="text-sm md:text-base lg:text-lg" />
            <CardProduct.Footer product={detailProduct} price={detailProduct?.price} id={detailProduct?.id} rating={detailProduct?.rating} className="text-sm md:text-base" />
          </div>
        </div>
      </Layout>
    </>
  );
};
export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const detailProduct = await getProductById(id);

    if (!detailProduct) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        detailProduct,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "failed to fetch data =>",
      },
    };
  }
}
export default ProductDetailPage;
