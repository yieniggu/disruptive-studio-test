export const getAssets = async () => {
  const btc = await fetch("https://data.messari.io/api/v1/assets/btc/metrics");
  const btcResponse = await btc.json();
  // console.log("btcData: ", btcResponse);
  const btcData = btcResponse.data;

  const eth = await fetch("https://data.messari.io/api/v1/assets/eth/metrics");
  const ethResponse = await eth.json();
  // console.log("ethData: ", ethResponse);
  const ethData = ethResponse.data;

  const ada = await fetch("https://data.messari.io/api/v1/assets/ada/metrics");
  const adaResponse = await ada.json();
  // // console.log("adaData: ", adaResponse);
  const adaData = adaResponse.data;

  return { btcData, ethData, adaData };
};

export const getSeries = async () => {
  const today = new Date().toJSON().slice(0, 10);

  const weekBefore = new Date();

  weekBefore.setDate(weekBefore.getDate() - 7);

  const start = weekBefore.toJSON().slice(0, 10);

  // console.log("today: ", today);
  // console.log("week before: ", start);

  const ada = await fetch(
    `https://data.messari.io/api/v1/assets/ada/metrics/price/time-series?start=${start}&end=${today}&interval=1d`
  );
  const adaResponse = await ada.json();
  // console.log("ada response: ", adaResponse);
  const adaSeries = adaResponse.data.values;

  const btc = await fetch(
    `https://data.messari.io/api/v1/assets/btc/metrics/price/time-series?start=${start}&end=${today}&interval=1d`
  );
  const btcResponse = await btc.json();
  // console.log("btc response: ", btcResponse);
  const btcSeries = btcResponse.data.values;

  const eth = await fetch(
    `https://data.messari.io/api/v1/assets/eth/metrics/price/time-series?start=${start}&end=${today}&interval=1d`
  );
  const ethResponse = await eth.json();
  // console.log("eth response: ", ethResponse);
  const ethSeries = ethResponse.data.values;

  return { adaSeries, btcSeries, ethSeries };
};
