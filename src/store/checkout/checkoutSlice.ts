import { CheckoutData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface CheckoutState {
  data: CheckoutData | null;
}


const initialState: CheckoutState = {
  data: null,
};


const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<CheckoutData>) => {
      state.data = action.payload;
    }
  },
});

export const { setData } = checkoutSlice.actions;

export default checkoutSlice.reducer;

