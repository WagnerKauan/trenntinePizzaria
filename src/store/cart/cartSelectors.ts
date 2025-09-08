import { RootState } from "../index";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);


export const selectCartTotalPrice = (state: RootState) => {
  const totalCart = state.cart.items.reduce((total, item) => {

    if(item.promotionalPrice) {
      return total + item.promotionalPrice * item.quantity;
    } else {
      return total + item.price * item.quantity;
    }

  }, 0);


  const discount = state.cart.activePromotion
    ?.filter((promotion) => promotion.discount)
    .reduce((acc, promotion) => acc + promotion.discount!, 0);
    

  if (discount) {
    const valueDiscount = (totalCart * discount) / 100;
    return totalCart - valueDiscount;
  } else {
    return totalCart;
  }
}


export const selectCartItemQuantity = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.quantity || 0;


export const selectCartPromotion = (state: RootState) => state.cart.activePromotion

