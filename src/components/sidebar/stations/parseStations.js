import csv from "csv-parser";
import fs from "fs";

const results = {};

fs.createReadStream("Stations.csv")
  .pipe(csv({}))
  .on("data", (data) => {
    const daytimeRoutes = data["Daytime Routes"].split(" ");
    const stopName = data["Stop Name"];

    daytimeRoutes.forEach((line) => {
      if (!results[line]) {
        results[line] = { stops: [] };
      }

      results[line].stops.push(stopName);
    });
  })
  .on("end", () => {
    const json = JSON.stringify(results, null, 2);
    fs.writeFileSync("stations.json", json);
    console.log("Conversion completed!");
  });
