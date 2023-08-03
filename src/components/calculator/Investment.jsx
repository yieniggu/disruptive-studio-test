import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

import BTCLogo from "../../assets/logos/btc.png";
import ETHLogo from "../../assets/logos/eth.png";
import ADALogo from "../../assets/logos/ada.png";
import { getProfit } from "../../helpers/ops";
import { useSelector } from "react-redux";

const roi = {
  btc: 0.05,
  eth: 0.042,
  ada: 0.01,
};

export const Investment = ({ asset }) => {
  const assetData = useSelector((state) => state.asset[asset]);

  const { fetchingAssets } = useSelector((state) => state.asset);

  const [formValues, handleInputChange] = useForm({ amount: 0 });
  const [profit, setProfit] = useState(0);

  const { amount } = formValues;

  useEffect(() => {
    setProfit(getProfit(amount, roi[asset]));
  }, [amount]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 px-4">
        <div className="rounded-full w-10">
          {asset === "btc" && <img src={BTCLogo}></img>}
          {asset === "eth" && <img src={ETHLogo}></img>}
          {asset === "ada" && <img src={ADALogo}></img>}
        </div>
        <h3 className="my-2 font-semibold text-gray-300">USD $</h3>
        <div className="flex flex-col gap-2">
          <input
            className="w-1/2 rounded-lg h-10 bg-gray-200 text-gray-500 px-2"
            type="number"
            min={0}
            value={amount}
            onChange={handleInputChange}
            name="amount"
          />
          <h2 className="text-sm text-gray-300">
            Current monthly ROI: {roi[asset] * 100}%
          </h2>
        </div>
        <div className="flex flex-col ml-auto">
          <h3 className="text-gray-300 font-semibold ">
            Estimated profit (1yr)
          </h3>
          <h4 className="text-sm text-gray-400">Using compound interest</h4>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-green-300 font-semibold text-lg ml-auto mr-20">
            USD ${Math.round(profit * 100) / 100}
          </h3>

          {!fetchingAssets && assetData ? (
            <h3 className="text-green-300 font-semibold text-lg ml-auto mr-20">
              {Math.round((profit / assetData.market_data.price_usd) * 100) /
                100}{" "}
              {asset.toUpperCase()}
            </h3>
          ) : (
            <div className="w-full h-8 rounded-md bg-gray-400 animate-pulse"></div>
          )}
        </div>
      </div>

      {asset !== "ada" && <hr className="h-2 border-1" />}
    </div>
  );
};
