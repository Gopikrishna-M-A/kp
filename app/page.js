"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Graph from "@/components/graph";

// import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue, get, set } from "firebase/database";
import app from "./firebase"; // Your config file

import { useEffect, useState } from "react";
import axios from "axios";

const db = getDatabase(app);

const dataRef = ref(db, "/sensor_data");

function formatTime(dateString) {
  const date = new Date(dateString);
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}

function convertToObjectArrays(dataObject) {
  if (!dataObject)
    return {
      tdsArray: [],
      temperatureArray: [],
      turbidityArray: [],
      pHArray: [],
    };

  const keys = Object.keys(dataObject);
  const tdsArray = [];
  const temperatureArray = [];
  const turbidityArray = [];
  const pHArray = [];

  keys.forEach((key) => {
    if (key !== "") {
      const entry = dataObject[key];
      const time = formatTime(key);
      tdsArray.push({ name: time, TDS: entry["TDS"] });
      temperatureArray.push({ name: time, Temperature: entry["Temperature"] });
      turbidityArray.push({ name: time, Turbidity: entry["Turbidity"] });
      pHArray.push({ name: time, pH: entry["pH"] });
    }
  });

  return { tdsArray, temperatureArray, turbidityArray, pHArray };
}


const page = () => {
  const [temperature, setTemperature] = useState();
  const [tds, setTDS] = useState();
  const [turbidity, setTurbidity] = useState();
  const [pH, setPH] = useState();
  const [waterSafe, setWaterSafe] = useState(false);

  useEffect(() => {
    onValue(
      dataRef,
      (snapshot) => {
        const { tdsArray, temperatureArray, turbidityArray, pHArray } =
          convertToObjectArrays(snapshot.val());
        setTemperature(temperatureArray);
        setTDS(tdsArray);
        setTurbidity(turbidityArray);
        setPH(pHArray);
        isWaterSafe(
            tdsArray[tdsArray.length - 1].TDS,
            temperatureArray[temperatureArray.length - 1].Temperature,
            pHArray[pHArray.length - 1].pH,
            turbidityArray[turbidityArray.length - 1].Turbidity
        )
      },
      (error) => {
        console.error("Error reading data:", error);
      }
    );

  }, []);



async function isWaterSafe(tds, temperature, ph, turbidity) {
  // Define threshold values for safe drinking water
  const tdsThreshold = 500; // Example threshold for TDS in ppm
  const temperatureThreshold = 50; // Example threshold for temperature in degrees Celsius
  const phThreshold = [6.5, 8.5]; // Example range for pH
  const turbidityThreshold = 5; // Example threshold for turbidity in NTU

  // Check if water meets the criteria
  const tdsSafe = tds <= tdsThreshold;
  const temperatureSafe = temperature <= temperatureThreshold;
  const phSafe = ph >= phThreshold[0] && ph <= phThreshold[1];
  const turbiditySafe = turbidity <= turbidityThreshold;

  const res = await axios.post(`http://127.0.0.1:5000/predict`, {
    pH: [ph],
    Temperature: [temperature],
    TDS: [tds],
    Turbidity: [turbidity],
  });

  console.log(res.data.result);

  // Return true if all parameters are within safe limits, otherwise return false
  setWaterSafe(res.data.result)
  return res.data.result
}


  return (
    <div className="p-20">
      <div className="flex">
        <div className="flex gap-10 flex-col w-1/2">
          <div className="flex gap-10">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>pH Value</CardTitle>
                <CardDescription>Information about pH level</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Current pH: {pH ? pH[pH.length - 1].pH : "0.0"}</p>
              </CardContent>
            </Card>

            <Card className="w-72">
              <CardHeader>
                <CardTitle>Temperature</CardTitle>
                <CardDescription>
                  Information about current temperature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Current Temperature:{" "}
                  {temperature
                    ? temperature[temperature.length - 1].Temperature
                    : "0.0"}
                  °C
                </p>
                {/* You can replace "25°C" with the actual temperature value you want to display */}
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-10">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>TDS Level</CardTitle>
                <CardDescription>
                  Information about Total Dissolved Solids
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Current TDS Level: {tds ? tds[tds.length - 1].TDS : "0.0"} ppm
                </p>
                {/* You can replace "150 ppm" with the actual TDS level you want to display */}
              </CardContent>
            </Card>

            <Card className="w-74">
              <CardHeader>
                <CardTitle>Turbidity Level</CardTitle>
                <CardDescription>Information about Turbidity</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Current Turbidity Level:{" "}
                  {turbidity
                    ? turbidity[turbidity.length - 1].Turbidity
                    : "0.0"}{" "}
                  NTU
                </p>
                {/* You can replace "10 NTU" with the actual turbidity level you want to display */}
              </CardContent>
            </Card>
          </div>
        </div>
        <div
          className={` select-none text-white w-1/2 border rounded-md flex justify-center items-center overflow-hidden ${
            waterSafe ? "bg-safe" : "bg-unsafe"
          } `}
        >
          {waterSafe ? (
            <div className="text-3xl font-bold uppercase">
              Water is safe to drink
            </div>
          ) : (
            <div className="text-3xl font-bold uppercase">
              Water is not safe to drink
            </div>
          )}
          <div className="drops">
            <div className="drop"></div>
            <div className="drop"></div>
            <div className="drop"></div>
            <div className="drop"></div>
          </div>
        </div>
      </div>
      <div className=" border rounded mt-20">
        <Graph
          temperature={temperature}
          tds={tds}
          turbidity={turbidity}
          pH={pH}
        />
      </div>
    </div>
  );
};

export default page;
