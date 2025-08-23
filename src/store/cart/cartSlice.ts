import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "@/types";

export interface CartItem extends Pizza {
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
    addPizza: (state, action: PayloadAction<Pizza>) => {
      const pizza = state.items.find((item) => item.id === action.payload.id);

      if (pizza) {
        pizza.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const pizza = state.items.find((item) => item.id === action.payload);
      if (pizza) {
        pizza.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const pizza = state.items.find((item) => item.id === action.payload);

      if (pizza && pizza.quantity > 1) {
        pizza.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    clearCart: () => initalState,
  },
});

export const { addPizza, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
