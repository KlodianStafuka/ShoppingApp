import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
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
    filterProducts(state, action: PayloadAction<string[]>) {
      const selectedBrands = action.payload;
      state.filteredProducts = state.products.filter(product => 
        selectedBrands.includes(product.brand)
      );
    },
  },
});

export const { setProducts, filterProducts } = productSlice.actions;
export default productSlice.reducer;
