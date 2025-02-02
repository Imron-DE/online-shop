import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${api}/products`);
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch data =>", error);
  }
};

export const getProductByCategory = async (category) => {
  try {
    const res = await axios.get(`${api}/products/${category}`);
    return res.data;
  } catch (error) {
    throw new Error("failed to fetch data =>", error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${api}/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("failed to fetch data =>", error);
  }
};
