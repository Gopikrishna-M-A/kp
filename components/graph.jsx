"use client";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";



const graph = ({temperature, tds, turbidity, pH}) => {


  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="p-10">
        <div className="font-bold text-3xl mb-5">pH</div>
        <LineChart
          width={500}
          height={200}
          data={pH}
          syncId="1"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pH" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>

      <div className="p-10">
        <div className="font-bold text-3xl mb-5">Temperature</div>
        <LineChart
          width={500}
          height={200}
          data={temperature}
          syncId="2"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Temperature" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>

      <div className="p-10">
        <div className="font-bold text-3xl mb-5">TDS</div>
        <LineChart
          width={500}
          height={200}
          data={tds}
          syncId="3"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="TDS" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>

      <div className="p-10">
        <div className="font-bold text-3xl mb-5">Turbidity</div>
        <LineChart
          width={500}
          height={200}
          data={turbidity}
          syncId="4"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Turbidity" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default graph;
