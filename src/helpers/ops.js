// Format the price above to USD using the locale, style, and currency.
export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const USDCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

export const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const getProfit = (amount, roi) => {
  return amount * Math.pow(1 + roi, 12);
};

export const seriesToPoints = (series) => {
  let points = [];

  series.forEach((serie, index) => {
    const close = serie[3]; // take the close price of the day

    points.push({ name: `day ${index}`, price: close });
  });

  return points;
};

export const assetsToJSON = (assets, points) => {
  const result = [];

  assets.forEach((asset, index) => {
    result.push({
      asset: asset.symbol,
      usdPrice: asset.market_data.price_usd,
      percentChange1H: asset.market_data.percent_change_usd_last_1_hour,
      percentChange24H: asset.market_data.percent_change_usd_last_24_hours,
      marketCap: USDCompact.format(asset.marketcap.current_marketcap_usd),
      realVolume24H: USDCompact.format(
        asset.market_data.real_volume_last_24_hours
      ),
      roiPercentChangeLast1W:
        Math.round(asset.roi_data.percent_change_last_1_week * 100) / 100,
      roiPercentChangeLast1M:
        Math.round(asset.roi_data.percent_change_last_1_month * 100) / 100,
      roiPercentChangeLast1Y:
        Math.round(asset.roi_data.percent_change_last_1_year * 100) / 100,
      lastWeekSeries: points[index],
      date: new Date(),
    });
  });

  return result;
};
