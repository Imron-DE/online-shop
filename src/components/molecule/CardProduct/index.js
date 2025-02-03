import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/Cart/cartSlice";

const CardProduct = ({ children }) => {
  return (
    <div className="rounded-lg bg-gradient-to-r  from-fuchsia-500 via-pink-500 to-purple-500 p-2">
      <div className="w-full h-full max-w-xs rounded-lg bg-white ">{children}</div>
    </div>
  );
};

function Header({ image, title, link = "#" }) {
  return (
    <Link href={link}>
      <Image src={image} alt={`Gambar produk ${title}`} className="p-4 rounded-t-lg w-full aspect-video object-contain " width={300} height={300} />
    </Link>
  );
}

function Body({ title, desc, showDesc = true, link = "#" }) {
  return (
    <div className="px-5 pb-5 h-40 min-h-[160px]">
      <Link href={link}>
        <h3 className="text-3xl font-bold text-gray-900 line-clamp-2 min-h-[75px]">{title}</h3>
      </Link>

      {showDesc && desc ? <p className="mt-3 text-slate-700 text-base text-justify line-clamp-4">{desc}</p> : null}
    </div>
  );
}

function Footer({ price, rating, product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product && product.id) {
      dispatch(addToCart(product));
    } else {
      console.error("Produk tidak valid:", product);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-5 pb-5">
      <span className="text-2xl font-semibold mb-2 mt-10">{price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>

      <div className="flex items-center mt-2">
        <span className="text-yellow-500 text-xl">{rating.rate}</span>
        <span className="ml-2 text-gray-500">({rating.count} reviews)</span>
      </div>

      <Button buttonClassname="bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-300 hover:from-red-500 hover:via-orange-600 hover:to-yellow-600 text-white w-full mt-4" onClick={handleAddToCart}>
        Beli
      </Button>
    </div>
  );
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
