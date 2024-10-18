import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  image: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    filterProducts(state, action: PayloadAction<{ brand?: string; category?: string }>) {
      const { brand, category } = action.payload;
      state.filteredProducts = state.products.filter(product => 
        (!brand || product.brand === brand) && (!category || product.category === category)
      );
    },
    searchProducts(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) || product.id.toString() === searchTerm
      );
    },
  },
});

export const { setProducts, filterProducts, searchProducts } = productSlice.actions;
export default productSlice.reducer;
