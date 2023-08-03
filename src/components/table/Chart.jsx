import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import PropTypes from "prop-types";

export const Chart = (points) => {
  return (
    <div className="w-full h-full mx-auto mt-5 mr-4">
      <LineChart data={points} width={200} height={100}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="price" />
        <Line type="monotone" stroke="#074564" dataKey="price" />
      </LineChart>
    </div>
  );
};

Chart.propTypes = {
  points: PropTypes.array.isRequired,
};
