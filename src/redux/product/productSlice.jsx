// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchProduct, fetchProductbyid, createProduct } from "../../services/api";

// const initialState = {
//   products: [],
//   product: null,
//   status: "idle",
//   loading: false,
//   addLoading: false,
// };

// export const fetchAllProducts = createAsyncThunk(
//   'products/fetchAllProducts',
//   async () => {
//     const products = await fetchProduct();
//     return products;
//   }
// );

// export const fetchProductByid = createAsyncThunk(
//   'products/fetchProductbyid',
//   async (id) => {
//     const product = await fetchProductbyid(id);
//     return product;
//   }
// );

// // ✅ This is the new one you're missing
// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (newProduct) => {
//     const response = await createProduct(newProduct);
//     return response;
//   }
// );

// const productSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//       resetAddLoading: (state) => {
//         state.addLoading = false;
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchAllProducts.pending, (state) => {
//           state.status = "loading";
//           state.products = [];
//         })
//         .addCase(fetchAllProducts.fulfilled, (state, action) => {
//           state.status = "succeeded";
//           state.products = action.payload;
//         })
//         .addCase(fetchAllProducts.rejected, (state) => {
//           state.status = "failed";
//           state.products = [];
//         })
  
//         .addCase(fetchProductByid.pending, (state) => {
//           state.status = "loading";
//           state.product = null;
//         })
//         .addCase(fetchProductByid.fulfilled, (state, action) => {
//           state.status = "succeeded";
//           state.product = action.payload;
//         })
//         .addCase(fetchProductByid.rejected, (state) => {
//           state.status = "failed";
//           state.product = null;
//         })
  
//         .addCase(addProduct.pending, (state) => {
//           state.addLoading = true;
//         })
//         .addCase(addProduct.fulfilled, (state, action) => {
//           state.addLoading = false;
//           state.products.push(action.payload);
//         })
//         .addCase(addProduct.rejected, (state) => {
//           state.addLoading = false;
//         });
//     }
//   });
  
//   export const { resetAddLoading } = productSlice.actions;
//   export default productSlice.reducer;
  

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProduct, fetchProductbyid, createProduct,  apiUpdateProduct, apiDeleteProduct } from "../../services/api";

const initialState = {
  products: [],
  product: null,
  status: "idle",
  loading: false,
  addLoading: false,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetchProduct();
    return response.product;
  }
);

export const fetchProductByid = createAsyncThunk(
  'products/fetchProductbyid',
  async (id) => {
    const product = await fetchProductbyid(id);
    return product;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    const response = await createProduct(newProduct);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }) => {
    const response = await apiUpdateProduct(id, data);
    return response.product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await apiDeleteProduct(id);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
          resetAddLoading: (state) => {
            state.addLoading = false;
          }},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.products = [];
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed";
        state.products = [];
      })
      // FETCH BY ID
      .addCase(fetchProductByid.pending, (state) => {
        state.status = "loading";
        state.product = null;
      })
      .addCase(fetchProductByid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductByid.rejected, (state) => {
        state.status = "failed";
        state.product = null;
      })
      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.addLoading = false;
      })
      // UPDATE PRODUCT
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map(p => p._id === action.payload._id ? action.payload : p);
      })
      // DELETE PRODUCT
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  }
});
export const { resetAddLoading } = productSlice.actions;
export default productSlice.reducer;