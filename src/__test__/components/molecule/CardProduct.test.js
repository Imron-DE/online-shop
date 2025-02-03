import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardProduct from "@/components/CardProduct"; // Sesuaikan dengan path yang benar
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "@/redux/store"; // Sesuaikan dengan rootReducer Anda
import { addToCart } from "@/redux/Cart/cartSlice"; // Sesuaikan dengan lokasi action addToCart Anda
import { useDispatch } from "react-redux";

// Membuat store mock
const store = createStore(rootReducer);

const productMock = {
  id: 1,
  title: "Produk A",
  desc: "Deskripsi Produk A",
  price: 100000,
  image: "/assets/productA.png",
  rating: {
    rate: 4.5,
    count: 200,
  },
};

// Mocking dispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("CardProduct", () => {
  it("render dengan judul dan deskripsi yang sesuai", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CardProduct>
          <CardProduct.Header image={productMock.image} title={productMock.title} />
          <CardProduct.Body title={productMock.title} desc={productMock.desc} />
        </CardProduct>
      </Provider>
    );

    expect(getByText(productMock.title)).toBeInTheDocument();
    expect(getByText(productMock.desc)).toBeInTheDocument();
  });

  it("render dengan gambar produk yang sesuai", () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <CardProduct>
          <CardProduct.Header image={productMock.image} title={productMock.title} />
        </CardProduct>
      </Provider>
    );

    const imageElement = getByAltText(`Gambar produk ${productMock.title}`);
    expect(imageElement).toBeInTheDocument();
  });

  it("render dengan harga yang sesuai", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CardProduct>
          <CardProduct.Footer price={productMock.price} rating={productMock.rating} product={productMock} />
        </CardProduct>
      </Provider>
    );

    expect(getByText("Rp100.000")).toBeInTheDocument();
  });

  it("render dengan rating produk yang sesuai", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CardProduct>
          <CardProduct.Footer price={productMock.price} rating={productMock.rating} product={productMock} />
        </CardProduct>
      </Provider>
    );

    expect(getByText("4.5")).toBeInTheDocument();
    expect(getByText("(200 reviews)")).toBeInTheDocument();
  });

  it("memanggil fungsi handleAddToCart ketika tombol Beli diklik", () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock); // Mock useDispatch untuk mengembalikan dispatchMock

    const { getByText } = render(
      <Provider store={store}>
        <CardProduct>
          <CardProduct.Footer price={productMock.price} rating={productMock.rating} product={productMock} />
        </CardProduct>
      </Provider>
    );

    const buyButton = getByText("Beli");
    fireEvent.click(buyButton);

    // Verifikasi apakah fungsi dispatch dipanggil dengan produk yang benar
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(addToCart(productMock));
  });
});
