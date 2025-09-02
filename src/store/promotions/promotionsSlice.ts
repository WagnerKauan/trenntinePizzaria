import { Promotion } from "@/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface PromotionsState {
  promotions: Promotion[];
}


const initialState: PromotionsState = {
  promotions: [],
};


const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setPromotions: (state, action: PayloadAction<Promotion[]>) => {
      state.promotions = action.payload;
    },
  },
});


export const { setPromotions } = promotionsSlice.actions;
export default promotionsSlice.reducer;