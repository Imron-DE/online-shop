import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "@/redux/Cart/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCartData(savedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  return (
    <nav className="flex justify-center py-4 shadow-md ">
      <div className="flex items-center gap-3 px-20">
        <Link href="/">
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <p className="text-2xl font-semibold text-gray-900">SHOPPER</p>
      </div>
      <ul className="hidden md:flex items-center gap-12 text-gray-500 text-lg font-medium list-none ml-10">
        <Link href="/category/men's%20clothing">
          <li className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900">
            Men
            <hr className="border-none w-4/5 h-[3px] rounded-md bg-red-500" />
          </li>
        </Link>
        <Link href="/category/women's%20clothing">
          <li className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900">
            Women
            <hr className="border-none w-4/5 h-[3px] rounded-md bg-red-500" />
          </li>
        </Link>
        <Link href="/category/electronics">
          <li className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900">
            Electronics
            <hr className="border-none w-4/5 h-[3px] rounded-md bg-red-500" />
          </li>
        </Link>
        <Link href="/category/jewelery">
          <li className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900">
            Jewelry
            <hr className="border-none w-4/5 h-[3px] rounded-md bg-red-500" />
          </li>
        </Link>
      </ul>
      <div className="flex items-center gap-10 ml-auto">
        <Link href="/login">
          <Button buttonClassname="w-[157px] h-[58px] border border-gray-400 rounded-full text-gray-600 text-lg font-medium bg-white hover:bg-gray-100">Login</Button>
        </Link>
        <div className="relative ">
          <Link href="/cart">
            <Image src="/assets/cart_icon.png" alt="cart" width={30} height={30} className="cursor-pointer" />
            <div className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center text-xl bg-red-500 text-white rounded-full">{cart.reduce((total, item) => total + item.qty, 0)} </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
