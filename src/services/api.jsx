import axios, { Axios } from "axios";

const api_url = "https://api.strategemmedia.com/api/all";

 export const fetchProduct = async()=>{
    const response = await axios.get(api_url, { withCredentials: true })
    return response.data;
}
export const createProduct = async (productData) => {
  const response = await axios.post("https://api.strategemmedia.com/api/product", productData, { withCredentials: true });
  return response.data;
};
export const apiUpdateProduct = async (id, productData) => {
  const response = await axios.put(`https://api.strategemmedia.com/api/update/${id}`, productData, { withCredentials: true });
  return response.data;
};
export const apiDeleteProduct = async (id) => {
  const response = await axios.delete(`https://api.strategemmedia.com/api/delete/${id}`, { withCredentials: true });
  return response.data;
};

export const fetchProductbyid = async(id)=>{
    const response = await axios.get(`https://api.strategemmedia.com/api/singleproduct/${id}`, { withCredentials: true })
    return response.data
 
}

export const register = async (userData) => {
  const response = await axios.post("https://api.strategemmedia.com/api/register", userData, { withCredentials: true });
  return response;
};

export const loginfun = async (loginData) => {
  const response = await axios.post("https://api.strategemmedia.com/api/login", loginData, { withCredentials: true });
  console.log(response)
  return response;
};