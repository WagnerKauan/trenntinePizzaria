import { RootState } from "../index";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);


export const selectCartItemQuantity = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.quantity || 0;