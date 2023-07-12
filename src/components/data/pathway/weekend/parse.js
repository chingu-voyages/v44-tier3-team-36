import csv from "csv-parser";
import fs from "fs";

const stations = {};

fs.createReadStream("Stations.csv")
  .pipe(csv({ headers: true }))
  .on("data", (row) => {
    stations[row["GTFS Stop ID"]] = {
      name: row["Stop Name"],
      longitude: parseFloat(row["GTFS Longitude"]),
      latitude: parseFloat(row["GTFS Latitude"]),
      borough: row["Borough"],
      north: {},
      south: {},
    };
  })
  .on("end", () => {
    console.log("Compiled Stations");

    const filenames = ["1", "2", "5"];

    filenames.forEach((filename) => {
      const shapePath = `${filename}.csv`;
      let lastStations = [];
      let path = [];

      fs.createReadStream(shapePath)
        .pipe(csv({ headers: false }))
        .on("data", (row) => {
          const potentialStations = Object.entries(stations)
            .filter(
              ([, v]) =>
                v.latitude === parseFloat(row[1]) &&
                v.longitude === parseFloat(row[2])
            )
            .map(([k]) => k);

          if (potentialStations.length > 0) {
            if (lastStations.length > 0) {
              lastStations.forEach((ls) => {
                potentialStations.forEach((ps) => {
                  stations[ls].north[ps] = path;
                  stations[ps].south[ls] = path.slice().reverse();
                });
              });
            }
            lastStations = potentialStations;
            path = [];
          } else {
            path.push([parseFloat(row[2]), parseFloat(row[1])]);
          }
        })
        .on("end", () => {
          console.log(`Processed ${filename}`);
        });
    });

    console.log("Writing to JSON file");
    fs.writeFileSync("station_details.json", JSON.stringify(stations));
  });
