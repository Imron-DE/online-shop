import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button"; // Sesuaikan path
import Layout from "@/components/templates/layout"; // Sesuaikan path
import { addToCart, removeFromCart, setCartData } from "@/redux/Cart/cartSlice"; // Sesuaikan path
import { useRouter } from "next/router";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data); // Mengambil data cart dari Redux store
  const router = useRouter();

  // Tambahkan state showModal untuk mengontrol modal
  const [showModal, setShowModal] = useState(false);

  // Menghitung total harga
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cart]);

  // Menyimpan cart ke localStorage saat cart berubah
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); // Menyimpan cart ke localStorage
    }
  }, [cart]);

  // Mengambil data cart dari localStorage saat pertama kali aplikasi dimuat
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setCartData(storedCart)); // Meng-update state Redux dengan data dari localStorage
  }, [dispatch]);

  // Menambahkan produk ke cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Menghapus produk dari cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    // Ambil token dari cookies atau localStorage
    const userToken = localStorage.getItem("token");

    // Jika token tidak ada, arahkan pengguna ke halaman login
    if (!userToken) {
      router.push("/login");
    }
  }, [router]);

  // Fungsi untuk menangani checkout dan menampilkan modal
  const handleCheckout = () => {
    setShowModal(true); // Menampilkan modal setelah checkout
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 mt-20 mb-96">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">
            Keranjang belanja kosong.{" "}
            <Link href="/" className="text-blue-500">
              Belanja sekarang!
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.title} width={60} height={60} className="rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500">Rp {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-full"
                    onClick={() => handleRemoveFromCart(item.id)} // Mengurangi qty atau menghapus produk
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{item.qty}</span>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-full"
                    onClick={() => handleAddToCart(item)} // Menambah qty produk
                  >
                    +
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleRemoveFromCart(item.id)} // Menghapus produk
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right mt-6">
              <h2 className="text-2xl font-semibold">Total: Rp {totalPrice.toLocaleString()}</h2>
              <Button
                buttonClassname="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleCheckout} // Menambahkan aksi checkout
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Checkout */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold">Checkout Successful</h2>
            <p className="mt-4 text-gray-500">Your order has been placed successfully!</p>
            <div className="mt-6 flex justify-end">
              <Button
                buttonClassname="px-6 py-2 bg-blue-500 text-white rounded-lg"
                onClick={closeModal} // Menutup modal
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
