import { useEffect } from "react";
import { Calculator } from "./components/calculator/Calculator";
import { useDispatch } from "react-redux";
import { fetchAssets, fetchSeries } from "./store/slices/asset/thunks";
import { CriptoTable } from "./components/table/CriptoTable";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchSeries());
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      dispatch(fetchAssets());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-20 px-10 py-4 w-full">
      <Calculator />
      <CriptoTable />
    </div>
  );
}

export default App;
