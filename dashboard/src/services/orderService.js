import axios from "axios";

const API = "https://zerodha-backend-ca5i.onrender.com";
export const placeOrder = async ({ name, qty, price, mode }) => {
  try {
    const res = await axios.post(`${API}/newOrder`, {
      name: name.toUpperCase().trim(),
      qty: Number(qty),
      price: Number(price),
      mode,
    });

    return res.data;

  } catch (error) {
    throw error.response?.data || { message: "Order failed" };
  }
};