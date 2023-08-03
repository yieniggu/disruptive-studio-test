import { useSelector } from "react-redux";
import { Chart } from "./Chart";
import {
  USDCompact,
  USDollar,
  assetsToJSON,
  downloadFile,
} from "../../helpers/ops";
import { useEffect, useState } from "react";
import { LoadingRow } from "./LoadingRow";

export const CriptoTable = () => {
  const { ada, btc, eth, adaPoints, btcPoints, ethPoints, fetchingAssets } =
    useSelector((state) => state.asset);

  const [assets, setAssets] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    ada && btc && eth && !fetchingAssets && setAssets([ada, btc, eth]);
  }, [ada, btc, eth]);

  useEffect(() => {
    adaPoints &&
      btcPoints &&
      ethPoints &&
      !fetchingAssets &&
      setPoints([adaPoints, btcPoints, ethPoints]);
  }, [adaPoints, btcPoints, ethPoints]);

  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(assetsToJSON(assets, points)),
      fileName: `assets-summary-${new Date().toJSON().slice(0, 20)}`,
      fileType: "text/json",
    });
  };

  const exportToCsv = (e) => {
    e.preventDefault();

    // Headers for each column
    let headers = [
      "asset,price_usd,change_vs_usd_1h,change_vs_usd_24h,reported_marketcap,real_volume_24h,change_vs_usd_7d,change_vs_usd_30d,change_vs_usd_ytd,date",
    ];

    // Convert users data to a csv
    let csv = assets.reduce((acc, asset) => {
      acc.push(
        [
          asset.symbol,
          asset.market_data.price_usd,
          asset.market_data.percent_change_usd_last_1_hour,
          asset.market_data.percent_change_usd_last_24_hours,
          USDCompact.format(asset.marketcap.current_marketcap_usd),
          USDCompact.format(asset.market_data.real_volume_last_24_hours),
          Math.round(asset.roi_data.percent_change_last_1_week * 100) / 100,
          Math.round(asset.roi_data.percent_change_last_1_month * 100) / 100,
          Math.round(asset.roi_data.percent_change_last_1_year * 100) / 100,
          new Date(),
        ].join(",")
      );
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...csv].join("\n"),
      fileName: `assets-summary-${new Date().toJSON().slice(0, 20)}`,
      fileType: "text/csv",
    });
  };

  return (
    <div className="">
      {assets && points ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-end gap-2">
            <button
              className="rounded-lg bg-yellow-300 px-4 py-2"
              onClick={exportToJson}
            >
              Export to JSON
            </button>
            <button
              className="rounded-lg bg-green-300 px-4 py-2"
              onClick={exportToCsv}
            >
              Export to CSV
            </button>
          </div>

          <div className="flex flex-col">
            <div
              className={`w-full h-2 bg-slate-500 animate-pulse horizontal-loader ${
                fetchingAssets ? "visible" : "invisible"
              }`}
            ></div>

            <table className="w-full text-gray-200">
              <thead>
                <tr className="bg-slate-600">
                  <th className="border-2">#</th>
                  <th className="border-2">ASSET</th>
                  <th className="border-2">PRICE (USD)</th>
                  <th className="border-2">CHANGE VS USD (1H)</th>
                  <th className="border-2">CHANGE VS USD (24H)</th>
                  <th className="border-2">7 DAY TREND</th>
                  <th className="border-2">REPORTED MARKETCAP</th>
                  <th className="border-2">REAL VOLUME (24H)</th>
                  <th className="border-2">CHANGE VS USD (7D)</th>
                  <th className="border-2">CHANGE VS USD (30D)</th>
                  <th className="border-2">CHANGE VS USD (YTD)</th>
                </tr>
              </thead>
              <tbody className="text-md">
                {assets.map((asset, index) => (
                  <tr
                    className="bg-slate-800 border-2 text-md text-gray-200 text-center"
                    key={index}
                  >
                    <td className="border-2">{index}</td>
                    <td className="border-2 font-semibold">{asset.symbol}</td>
                    <td className="border-2 px-2">
                      {USDollar.format(asset.market_data.price_usd)}
                    </td>
                    <td className="border-2">
                      {Math.round(
                        asset.market_data.percent_change_usd_last_1_hour * 100
                      ) /
                        100 +
                        "%"}{" "}
                    </td>

                    <td className="border-2">
                      {Math.round(
                        asset.market_data.percent_change_usd_last_24_hours * 100
                      ) /
                        100 +
                        "%"}{" "}
                    </td>

                    <td className="border-2">
                      {points ? (
                        <Chart points={points[index]} />
                      ) : (
                        <div className="h-4 w-full mx-2 bg-gray-600">
                          loading
                        </div>
                      )}
                    </td>
                    <td className="border-2">
                      {USDCompact.format(asset.marketcap.current_marketcap_usd)}
                    </td>
                    <td className="border-2">
                      {USDCompact.format(
                        asset.market_data.real_volume_last_24_hours
                      )}
                    </td>
                    <td className="border-2">
                      {Math.round(
                        asset.roi_data.percent_change_last_1_week * 100
                      ) /
                        100 +
                        "%"}
                    </td>
                    <td className="border-2">
                      {Math.round(
                        asset.roi_data.percent_change_last_1_month * 100
                      ) /
                        100 +
                        "%"}
                    </td>
                    <td className="border-2">
                      {Math.round(
                        asset.roi_data.percent_change_last_1_year * 100
                      ) /
                        100 +
                        "%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full h-20 rounded-lg bg-gray-400 animate-pulse"></div>
      )}
    </div>
  );
};
