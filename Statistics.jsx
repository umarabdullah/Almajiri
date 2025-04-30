import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import NavbarProfile from "../components/NavbarProfile";

const data = [
  { name: "Locals", value: 400 },
  { name: "Affiliates", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F"];

function Statistics() {
  return (
    <div>
      <NavbarProfile />
      <h1>Statistics</h1>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default Statistics;
