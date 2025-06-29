import axios, { Axios } from "axios";

const api_url = "http://141.136.44.187:5000/api/all";

 export const fetchProduct = async()=>{
    const response = await axios.get(api_url)
    return response.data;
}
export const createProduct = async (productData) => {
  const response = await axios.post("http://141.136.44.187:5000/api/product", productData);
  return response.data;
};
export const apiUpdateProduct = async (id, productData) => {
  const response = await axios.put(`http://141.136.44.187:5000/api/update/${id}`, productData);
  return response.data;
};
export const apiDeleteProduct = async (id) => {
  const response = await axios.delete(`http://141.136.44.187:5000/api/delete/${id}`);
  return response.data;
};

export const fetchProductbyid = async(id)=>{
    const response = await axios.get(`http://141.136.44.187:5000/api/singleproduct/${id}`)
    return response.data
 
}

export const register = async (userData) => {
  const response = await axios.post("http://141.136.44.187:5000/api/register", userData);
  return response;
};

export const loginfun = async (loginData) => {
  const response = await axios.post("http://141.136.44.187:5000/api/login", loginData);
  console.log(response)
  return response;
};