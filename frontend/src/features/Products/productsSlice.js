import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@shared/api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/products/", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional sync reducers here
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload || []; })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      // add
      .addCase(addProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addProduct.fulfilled, (s, a) => { s.loading = false; s.items.push(a.payload); })
      .addCase(addProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      // update
      .addCase(updateProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.loading = false;
        const idx = s.items.findIndex((p) => p.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(updateProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      // delete
      .addCase(deleteProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.items = s.items.filter((p) => p.id !== a.payload);
      })
      .addCase(deleteProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; });
  },
});

export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;