import { seriesToPoints } from "../../../helpers/ops";
import { getAssets, getSeries } from "../../../helpers/requests";
import { setAssets, setFetchingAssets, setPoints } from "./assetSlice";

export const fetchAssets = () => {
  return async (dispatch) => {
    dispatch(setFetchingAssets(true));
    let { btcData, ethData, adaData } = await getAssets();

    dispatch(setAssets({ btcData, ethData, adaData }));

    dispatch(setFetchingAssets(false));
  };
};

export const fetchSeries = () => {
  return async (dispatch) => {
    dispatch(setFetchingAssets(true));

    const { adaSeries, btcSeries, ethSeries } = await getSeries();

    const adaPoints = seriesToPoints(adaSeries);
    const btcPoints = seriesToPoints(btcSeries);
    const ethPoints = seriesToPoints(ethSeries);

    dispatch(setPoints({ adaPoints, btcPoints, ethPoints }));

    dispatch(setFetchingAssets(false));
  };
};
