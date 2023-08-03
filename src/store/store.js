import { configureStore } from "@reduxjs/toolkit";
import { assetSlice } from "./slices/asset/assetSlice";

export const store = configureStore({
  reducer: {
    asset: assetSlice.reducer,
  },
});
