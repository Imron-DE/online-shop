import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "@/redux/Cart/cartSlice";
import { useRouter } from "next/router";

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const [user, setUser] = useState(null); // Untuk menyimpan data pengguna
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Untuk mengatur tampilan menu mobile
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCartData(savedCart));

      // Ambil data pengguna dari localStorage jika ada
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleLogout = () => {
    // Menghapus token dan data pengguna dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Arahkan pengguna kembali ke halaman login
    router.push("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center py-4 shadow-md px-4 md:px-20">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
          </Link>
          <p className="text-2xl font-semibold text-gray-900">SHOPPER</p>
        </div>

        {/* Menu Kategori untuk layar besar */}
        <ul className="hidden md:flex items-center gap-12 text-gray-500 text-lg font-medium list-none">
          <Link href="/product">
            <li className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900">
              All
              <hr className="border-none w-4/5 h-[3px] rounded-md bg-red-500" />
            </li>
          </Link>
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

        {/* Menu Login / Cart */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <span className="text-lg text-gray-900 mr-3">Hi, {user}</span>
              <Button buttonClassname="w-[157px] h-[58px] border border-gray-400 rounded-full text-gray-600 text-lg font-medium bg-white hover:bg-gray-100" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button buttonClassname="w-[157px] h-[58px] border border-gray-400 rounded-full text-gray-600 text-lg font-medium bg-white hover:bg-gray-100">Login</Button>
            </Link>
          )}
          <div className="flex items-center gap-5">
            <Link href="/cart" className="flex items-center gap-2">
              <Image src="/assets/cart_icon.png" alt="cart" width={30} height={30} className="cursor-pointer" />
              <div className="w-10 h-10 flex items-center justify-center text-xl bg-red-500 text-white rounded-full">{cart.reduce((total, item) => total + item.qty, 0)}</div>
            </Link>
          </div>
        </div>

        {/* Hamburger Menu untuk layar kecil */}
        <div className="md:hidden flex items-center gap-5">
          <Button buttonClassname="text-gray-900 text-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className="fas fa-bars"></i>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu (ditampilkan ketika hamburger di klik) */}
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-5 text-gray-500 text-lg font-medium bg-white shadow-md p-4">
          <Link href="/product">
            <li className="cursor-pointer hover:text-gray-900">All</li>
          </Link>
          <Link href="/category/men's%20clothing">
            <li className="cursor-pointer hover:text-gray-900">Men</li>
          </Link>
          <Link href="/category/women's%20clothing">
            <li className="cursor-pointer hover:text-gray-900">Women</li>
          </Link>
          <Link href="/category/electronics">
            <li className="cursor-pointer hover:text-gray-900">Electronics</li>
          </Link>
          <Link href="/category/jewelery">
            <li className="cursor-pointer hover:text-gray-900">Jewelry</li>
          </Link>
        </ul>
      )}
    </>
  );
};

export default Navbar;
