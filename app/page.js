import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Graph from "@/components/graph";

const page = () => {
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
              <p>Current pH: 7.0</p>
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
              <p>Current Temperature: 25°C</p>
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
              <p>Current TDS Level: 150 ppm</p>
              {/* You can replace "150 ppm" with the actual TDS level you want to display */}
            </CardContent>
          </Card>

          <Card className="w-72">
            <CardHeader>
              <CardTitle>Turbidity Level</CardTitle>
              <CardDescription>Information about Turbidity</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Current Turbidity Level: 10 NTU</p>
              {/* You can replace "10 NTU" with the actual turbidity level you want to display */}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-1/2 border rounded-md"></div>
    </div>
    <div className=" border rounded mt-20">
    <Graph />

    </div>
    </div>
    
  );
};

export default page;
