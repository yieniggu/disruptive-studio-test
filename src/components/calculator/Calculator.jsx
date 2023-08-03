import { useState } from "react";
import { Investment } from "./Investment";

export const Calculator = () => {
  const assets = ["btc", "eth", "ada"];

  const [total, setTotal] = useState(0);

  return (
    <div className="flex flex-col mx-auto gap-4 rounded-md border-2 border-gray-500 bg-slate-500 p-4 xl:w-1/2">
      <h1 className="text-2xl text-white font-semibold mx-auto">
        Enter amount to invest
      </h1>
      {assets.map((asset, index) => (
        <Investment asset={asset} key={index} setTotal={setTotal} />
      ))}
    </div>
  );
};
