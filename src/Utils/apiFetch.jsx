import axios from "axios";
import { BASE_URL } from "./common";

export const getApi = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// api.js
export const getProductsForCollection = async (collectionId, limit, pageNumber, selectedValue, selectedFilters) => {
  try {
    const response = await axios.post(
      `https://shopperassistant.anncode.com/admin/collection/products`,
      {
        collectionId,
        page: pageNumber,
        limit: limit,
        sort: selectedValue,
        filter: selectedFilters
      },
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


//serach api
export const fetchDataForSearch = async (searchQuery, page, limit) => {
  try {
    const response = await axios.get(
      `https://shopperassistant.anncode.com/admin/product?page=${page}&limit=${limit}&search=${searchQuery}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};
