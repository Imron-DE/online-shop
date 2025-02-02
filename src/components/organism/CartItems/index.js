import { useState, useEffect, useContext } from "react";
import { getProducts } from "@/service/products";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { ShopContext } from "@/Context/ShopContext";

const CartItems = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []); // Pastikan `data` adalah array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Jika gagal, set sebagai array kosong
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header Tabel */}
      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-200 font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Pastikan `products` adalah array sebelum menggunakan `filter` */}
      {Array.isArray(products) &&
        products
          .filter((product) => cartItems.some((item) => item.id === product.id)) // Filter hanya produk yang ada di cart
          .map((item) => (
            <div key={item.id} className="grid grid-cols-6 gap-4 p-4 items-center">
              <Image src={item.image} alt={item.title} width={50} height={50} />
              <p>{item.title}</p>
              <p>{item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
              <div className="flex items-center">
                <Button onClick={() => addToCart(item)}>+</Button>
                <p className="mx-2">{cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0}</p>
                <Button onClick={() => removeFromCart(item.id)}>-</Button>
              </div>
              <p>{(item.price * (cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0)).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
              <Image src="/assets/cart_cross_icon.png" alt="Remove" width={30} height={30} className="cursor-pointer" onClick={() => removeFromCart(item.id)} />
            </div>
          ))}
    </div>
  );
};

export default CartItems;
