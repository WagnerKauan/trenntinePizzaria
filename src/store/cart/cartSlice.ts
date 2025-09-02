import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/generated/prisma";

export interface CartItem extends Product {
  quantity: number;
}

type ActivePromotion = {
  id: string;
  name: string;
};

interface CardState {
  items: CartItem[];
  activePromotion: ActivePromotion | null;
}

const initalState: CardState = {
  items: [],
  activePromotion: null,
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

    setActivePromotion: (state, action: PayloadAction<ActivePromotion>) => {
      state.activePromotion = action.payload;
    },
  },
});

export const { addProduct, incrementQuantity, decrementQuantity, clearCart, setActivePromotion } =
  cartSlice.actions;

export default cartSlice.reducer;
