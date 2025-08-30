import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/generated/prisma";

export interface CartItem extends Product {
  quantity: number;
}

interface CardState {
  items: CartItem[];
}

const initalState: CardState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initalState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = state.items.find((item) => item.id === action.payload.id);

      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    clearCart: () => initalState,
  },
});

export const { addProduct, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
