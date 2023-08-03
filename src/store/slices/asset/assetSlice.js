import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchingAssets: true,
  ada: null,
  btc: null,
  eth: null,
  adaPoints: null,
  btcPoints: null,
  ethPoints: null,
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setFetchingAssets: (state, { payload }) => {
      state.fetchingAssets = payload;
    },
    setAssets: (state, { payload }) => {
      state.ada = payload.adaData;
      state.btc = payload.btcData;
      state.eth = payload.ethData;
    },
    setPoints: (state, { payload }) => {
      state.adaPoints = payload.adaPoints;
      state.btcPoints = payload.btcPoints;
      state.ethPoints = payload.ethPoints;
    },
  },
});

export const { setFetchingAssets, setAssets, setPoints } = assetSlice.actions;
