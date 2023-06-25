import csv from "csv-parser";
import fs from "fs";

const results = {};

fs.createReadStream("Stations.csv")
  .pipe(csv({}))
  .on("data", (data) => {
    const daytimeRoutes = data["Daytime Routes"].split(" ");
    const stopName = data["Stop Name"];
    const latitude = parseFloat(data["GTFS Latitude"]);
    const longitude = parseFloat(data["GTFS Longitude"]);

    daytimeRoutes.forEach((line) => {
      if (!results[line]) {
        results[line] = { stops: {} };
      }

      results[line].stops[stopName] = { coordinates: [latitude, longitude] };
    });
  })
  .on("end", () => {
    const json = JSON.stringify(results, null, 2);
    fs.writeFileSync("stations.json", json);
    console.log("Conversion completed!");
  });
