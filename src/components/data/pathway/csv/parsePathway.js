import csv from "csv-parser";
import fs from "fs";


const filenames = ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C", "D", "E", "F", "G", "H", "J", "L", "M", "N", "Q", "R"];

filenames.forEach((filename) => {
    const results = [];
  
    fs.createReadStream(`${filename}.csv`)
      .pipe(csv({}))
      .on("data", (data) => {
        const shapeId = data["shape_id"];
        const latitude = parseFloat(data["shape_pt_lat"]);
        const longitude = parseFloat(data["shape_pt_lon"]);
  
        results.push({ latitude, longitude });
      })
      .on("end", () => {
        const json = JSON.stringify(results, null, 2);
        const jsonFilename = `${filename}.json`;
  
        fs.writeFile(jsonFilename, json, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing JSON file ${jsonFilename}:`, err);
          } else {
            console.log(`JSON file ${jsonFilename} saved successfully.`);
          }
        });
      });
  });